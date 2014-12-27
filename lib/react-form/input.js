var React = require('react');

var AddonMixin = require('./addon-mixin');
var PathMixin = require('./path-mixin');

var Input = React.createClass({
  displayName: 'Input',

  mixins: [PathMixin, AddonMixin('Input')],

  propTypes: {
    type: React.PropTypes.func.isRequired
  },

  renderWithAddons: function() {

    var props = React.__spread({}, this.props, {
      _pathSegment: false,
      getId: this.getId,
      getName: this.getName,
      getValue: this.getValue,
      setValue: this.setValue,
      type: undefined,
      for: undefined
    });

    //Create className for container.
    var cn = [
      'field',
      this.getNamePathSegment()
    ];

    if (this.props.type.displayName) {
      cn.push(this.props.type.displayName.toLowerCase());
    }

    return React.DOM.div({className: cn.join(' ')}, React.createElement(this.props.type, props));
  },

  setValue: function() {
    this.context.setPathValue.apply(this, [this.getValuePath()].concat(Array.prototype.slice.call(arguments)));
  }
});

module.exports = Input;
