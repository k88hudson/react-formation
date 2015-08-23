var React = require('react/addons');
var convertSchema = require('./convertSchema');
var createFormMixin = require('./createFormMixin');

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

  config.mixins.push(createFormMixin);

  return React.createClass(config);
};
