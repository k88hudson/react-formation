var React = require('react');

// This is the name of the object that we will add to the context
var CONTEXT_NAME = 'reactFormation';

// We can use this for contextTypes, childContextTypes
var types = {};
types[CONTEXT_NAME] = React.PropTypes.object;

// Methods that will be exposed on context.reactFormation and FormMixin
// Each method MUST have a .md file in src/lib/apiDocs
// e.g. for this.didSubmit(), there should be a file called didSubmit.md
// var docFiles = require.context('./apiDocs', true, /\.md$/).keys();
// var methods = docFiles.map(file => file.replace('./', '').replace('.md', ''));

var methods = [
  'didSubmit',
  'isGroupValid',
  'isValid',
  'linkField',
  'submitForm',
  'submitGroup',
  'validateField'
];

module.exports = {
  name: CONTEXT_NAME,
  types,
  methods
};
