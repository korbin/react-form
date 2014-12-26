/** @jsx React.DOM */
var React = require('react/addons');

var AddonMixin = require('./addon-mixin');
var PathMixin = require('./path-mixin');

var Inputs = React.createClass({
  displayName: 'Inputs',

  mixins: [PathMixin, AddonMixin('Inputs')],

  renderWithAddons: function() {
    //Create className for container.
    var cn = [
      'fields',
      this.getNamePathSegment()
    ];

    return React.DOM.div({className: cn.join(' ')}, this._renderChildren());
  },

  _renderChildren: function() {
    if (Array.isArray(this.getValue())) {
      return this.getValue().map(function(_, i) { return React.createElement(Inputs, {for: '' + i, key: i}, this.props.children); }, this);
    }

    return React.Children.map(this.props.children, React.addons.cloneWithProps);
  }
});

module.exports = Inputs;
