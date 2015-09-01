var React = require('react/addons');
var convertSchema = require('./convertSchema');
var CreateFormMixin = require('./CreateFormMixin');
var contextConfig = require('./contextConfig');

module.exports = function CreateForm(config) {
  if (!config.getSchema) throw new Error('You must include "getSchema" as one of the properties for CreateForm');
  if (!config.mixins) config.mixins = [];

  // We need this for setting up linked state
  if (config.mixins.indexOf(React.addons.LinkedStateMixin) === -1) {
    config.mixins.push(React.addons.LinkedStateMixin);
  }

  config.mixins.push({
    getInitialState: function () {

      var state = {
        __didSubmit: false,
        __dirtyFields: {}
      };

      this.__schema = this.getSchema();

      // assume we want a multi-part form
      if (this.__schema instanceof Array) {
        this.__schema = convertSchema(this.__schema);
      }

      Object.keys(schema).forEach(key => {
        state.__dirtyFields[key] = false;
        state[key] = this.__schema[key].initial;
      });

      return state;
    },

    childContextTypes: contextConfig.types,

    getChildContext: function() {
      var methods = {};
      contextConfig.methods.forEach(method => {
        methods[method] = this[method];
      });

      var context = {};
      context[contextConfig.name] = methods;
      return context;
    }
  });

  config.mixins.push(CreateFormMixin);

  return React.createClass(config);

};
