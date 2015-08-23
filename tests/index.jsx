// Make console.warn throw
var warn = console.warn;
console.warn = function (warning) {
  throw new Error(warning);
  warn.apply(console, arguments);
};

require('./CreateForm.test.jsx');
require('./convertSchema.test');
require('./ErrorMessage.test.jsx');
require('./validations.test');
