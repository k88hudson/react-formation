'use strict';

var contextConfig = require('./contextConfig');

var FormMixin = {
  contextTypes: contextConfig.types
};

// Add each method defined in the context to the mixin
contextConfig.methods.forEach(function (method) {
  FormMixin[method] = function () {
    return this.context.composableForms[method].apply(null, arguments);
  };
});

module.exports = FormMixin;