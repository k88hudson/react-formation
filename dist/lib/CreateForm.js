'use strict';

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
    getInitialState: function getInitialState() {
      var _this = this;

      var state = {
        __didSubmit: false,
        __dirtyFields: {}
      };

      this.__schema = this.getSchema();

      // assume we want a multi-part form
      if (this.__schema instanceof Array) {
        this.__schema = convertSchema(this.__schema);
      }

      Object.keys(this.__schema).forEach(function (key) {
        state.__dirtyFields[key] = false;
        state[key] = _this.__schema[key].initial;
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