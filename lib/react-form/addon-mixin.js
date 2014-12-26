var compose = require('lodash.compose');
var Immutable = require('immutable');
var React = require('react');

var AddonMixin = function(reactClass) {
  return {
    contextTypes: {
      addons: React.PropTypes.instanceOf(Immutable.Set)
    },

    childContextTypes: {
      addons: React.PropTypes.instanceOf(Immutable.Set).isRequired
    },

    getChildContext: function() {
      return {
        addons: this._getAddons()
      };
    },

    render: function() {
      return this._installAddons(this.renderWithAddons());
    },

    _getAddons: function() {
      return Immutable.Set()
        .union(this.context.addons || [])
        .union(this.props.addons || []);
    },

    _getInstallers: function() {
      var installers = [];

      this._getAddons().forEach(function(addon) {
        var installer = addon['installOn'+reactClass];

        if (installer) {
          installers.push(installer.bind(this));
        }
      }, this);

      return installers;
    },

    _installAddons: function(render) {
      var installers = this._getInstallers();

      if (installers.length === 0) {
        return render;
      }

      return compose.apply(this, installers)(render);
    }
  };
};

module.exports = AddonMixin;
