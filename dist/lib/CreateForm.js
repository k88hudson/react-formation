'use strict';

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
    getInitialState: function getInitialState() {
      var _this = this;

      var state = {
        didSubmit: false,
        dirtyFields: {}
      };

      Object.keys(this.schema).forEach(function (key) {
        state.dirtyFields[key] = false;
        state[key] = _this.schema[key].initial;
      });

      return state;
    },

    childContextTypes: contextConfig.types,

    getChildContext: function getChildContext() {
      var _this2 = this;

      var methods = {};
      contextConfig.methods.forEach(function (method) {
        methods[method] = _this2[method];
      });

      var context = {};
      context[contextConfig.name] = methods;
      return context;
    }
  });

  config.mixins.push(CreateFormMixin);

  return React.createClass(config);
};