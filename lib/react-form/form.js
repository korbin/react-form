var Immutable = require('immutable');
var objectPath = require('object-path');
var React = require('react');

var AddonMixin = require('./addon-mixin');
var PathMixin = require('./path-mixin');

var Form = React.createClass({
  displayName: 'Form',

  mixins: [AddonMixin('Form')],

  propTypes: {
    for: React.PropTypes.string,
    object: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      for: 'object',
      object: {}
    };
  },

  getInitialState: function() {
    return {object: this.props.object};
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({object: nextProps.object});
  },

  childContextTypes: PathMixin.contextTypes,

  getChildContext: function() {
    return {
      object: this.state.object,
      namePath: Immutable.List([this.props.for]),
      valuePath: Immutable.List(),
      setPathValue: this._handleUpdate
    };
  },

  getValue: function() {
    return this.state.object;
  },

  renderWithAddons: function() {
    //Create className for container.
    var cn = ['form', this.props.for].join(' ').trim();

    var props = React.__spread({}, this.props, {
      className: cn,
      for: undefined,
      onSubmit: this._handleSubmit,
      onUpdate: this._handleUpdate
    });

    //Child cloning is required for child context propagation - React bug?
    return React.DOM.form(props, React.Children.map(this.props.children, React.addons.cloneWithProps, this));
  },

  _handleSubmit: function(e) {
    if (this.props.onSubmit) {
      this.props.onSubmit.call(this, e);
      return;
    }
  },

  _handleUpdate: function(path, value) {
    if (this.props.onUpdate) {
      this.props.onUpdate.call(this, path, value);
      return;
    }

    //TODO(korbin): Write immutable objectPath library.
    var object = React.__spread({}, this.state.object);
    objectPath.set(object, path.toArray(), value);
    this.setState({object: object});
  }
});

module.exports = Form;
