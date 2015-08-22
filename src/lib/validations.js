var EMAIL_REGEX = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
var NUMBER_REGEX = /^\d+$/;

// TODO: make configurable, localizable, add basic templating
var messages = {
  email: 'This must be a valid email.',
  number: 'This must be a number.'
};

var validations = {
  email: function (value) {
    if (!EMAIL_REGEX.test(value)) {
      return messages.email;
    }
  },
  number: function (value) {
    if (!NUMBER_REGEX.test(value)) {
      return messages.number;
    }
  }
};

module.exports = validations;
