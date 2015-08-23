var React = require('react/addons');
var convertSchema = require('./convertSchema');
var CreateFormMixin = require('./CreateFormMixin');
var contextConfig = require('./contextConfig');

module.exports = function CreateForm(config) {

  if (!config.schema) throw new Error('You must include "schema" as one of the properties for CreateForm');
  if (!config.mixins) config.mixins = [];

  // If we get an array for the schema,
  // assume we want a multi-part form
  if (config.schema instanceof Array) {
    config.schema = convertSchema(config.schema);
  }

  // We need this for setting up linked state
  if (config.mixins.indexOf(React.addons.LinkedStateMixin) === -1) {
    config.mixins.push(React.addons.LinkedStateMixin);
  }

  config.mixins.push({
    getInitialState: function () {

      var state = {
        isValid: false,
        didSubmit: false,
        dirtyFields: {}
      };

      Object.keys(this.schema).forEach(key => {
        state.dirtyFields[key] = false;
        state[key] = this.schema[key].initial;
      });

      return state;
    },

    childContextTypes: contextConfig.types,

    getChildContext: function() {
      var methods = {};
      contextConfig.methods.forEach(method => {
        methods[method] = this[method];
      });
      return {
        composableForms: methods
      };
    }
  });

  config.mixins.push(CreateFormMixin);

  return React.createClass(config);
};
