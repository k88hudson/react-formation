// Make console.warn throw
var warn = console.warn;
console.warn = function (warning) {
  throw new Error(warning);
  warn.apply(console, arguments);
};

require('./convertSchema.test');
require('./ErrorMessage.test.jsx');
require('./Validator.test');
require('./CreateForm.test.jsx');
require('./didSubmit.test.jsx');
require('./linkField.test.jsx');
require('./submitForm.test.jsx');
require('./submitGroup.test.jsx');
require('./validateField.test.jsx');
require('./isGroupValid.test.jsx');
require('./isValid.test.jsx');
require('./globalErrors.test.jsx');
