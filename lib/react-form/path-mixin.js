var Immutable = require('immutable');
var objectPath = require('object-path');
var React = require('react');
var type = require('type-detect');

var PathMixin = {
  propTypes: {
    for: React.PropTypes.string.isRequired,
    forName: React.PropTypes.string,
    _pathSegment: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {_pathSegment: true};
  },

  contextTypes: {
    object: React.PropTypes.any.isRequired,
    namePath: React.PropTypes.instanceOf(Immutable.List).isRequired,
    valuePath: React.PropTypes.instanceOf(Immutable.List).isRequired,
    setPathValue: React.PropTypes.func.isRequired
  },

  childContextTypes: {
    namePath: React.PropTypes.instanceOf(Immutable.List).isRequired,
    valuePath: React.PropTypes.instanceOf(Immutable.List).isRequired
  },

  getChildContext: function() {
    return {
      namePath: this.getNamePath(),
      valuePath: this.getValuePath()
    };
  },

  getId: function() {
    if (this.props.id) {
      return this.props.id;
    }

    if (this.props.getId) {
      return this.props.getId.call(this);
    }

    if (this.context.getId) {
      return this.context.getId.call(this);
    }

    return this.getNamePath().toArray().join('_');
  },

  getName: function() {
    if (this.props.name) {
      return this.props.name;
    }

    if (this.props.getName) {
      return this.props.getName.call(this);
    }

    if (this.context.getName) {
      return this.context.getName.call(this);
    }

    return this.getNamePath().toArray().join('.');
  },

  getNamePath: function() {
    if (this.props._pathSegment) {
      return (this.context.namePath || this.context.valuePath).push(this.props.forName || this.props.for);
    }

    return this.context.namePath;
  },

  getNamePathSegment: function() {
    return this.getNamePath().toArray().slice(-1)[0];
  },

  getValue: function() {
    if (type(this.props.value) !== 'undefined') {
      return this.props.value;
    }

    return objectPath.get(this.context.object, this.getValuePath().toArray());
  },

  getValuePath: function() {
    if (this.props._pathSegment) {
      return this.context.valuePath.push(this.props.for);
    }

    return this.context.valuePath;
  }
};

module.exports = PathMixin;
