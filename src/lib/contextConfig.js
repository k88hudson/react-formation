var React = require('react');

// This is the name of the object that we will add to the context
var CONTEXT_NAME = 'composableForms';

// We can use this for contextTypes, childContextTypes
var types = {};
types[CONTEXT_NAME] = React.PropTypes.object;

// Methods that will be exposed on context.composableForms and FormMixin
var methods = [
  'isValid',
  'didSubmit',
  'submitForm',
  'linkField',
  'validateField',
  'isGroupValid',
  'submitGroup'
];

module.exports = {
  name: CONTEXT_NAME,
  types,
  methods
};
