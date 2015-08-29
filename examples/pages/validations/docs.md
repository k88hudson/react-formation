# Validation

You can validate fields by adding a `Formation.Validator` object to the `type` property of a schema definition:

```jsx{5,8,11}
var Validator = require('react-formation').Validator;

var schema = {
  email: {
    type: Validator.email()
  },
  creditCard: {
    type: Validator.creditCard()
  },
  numberOfApples: {
    type: Validator.number().min(1).max(10)
  }
};
```

## Built-in validations

React Formation includes several built-in validations from [chriso's validator.js](http://github.com/chriso/validator.js), including `url`, `email`, `alpha`, `creditCard`, `number`, `min`, `max`, `date`, `before`, `after`, `minLength`, `maxLength`, `oneOf`, and `pattern`.

All built in validations are functions and can be called like this:

```jsx
Validator.creditCard();
```

As a short form, you can specify them in a schema with a string:

```jsx
email: {
  type: 'creditCard' // this is equivalent to Validator.creditCard();
}
```

Some validations take arguments, such as the `min`, `max`, and `oneOf` validations:

```jsx
Validator.min(0);
Validator.max(100);
Validator.oneOf(['foo', 'bar', 'baz'])
```

You can also chain multiple validations together like this:

```jsx
Validator.number().creditCard();
```

## Customization

### Error messages

Each built-in validation in React Formation ships with an error message. If you would like to override it, you can do so at the global level:

```jsx
var Validator = require('react-formation').Validator;

Validator.messages.creditCard = 'NO FOOLING'

// Now any invalid fields with this validation
// will return NO FOOLING as the error message
```

or at the instance level:

```jsx
var Validator = require('react-formation').Validator;

var v = Validator().creditCard();
v.messages.creditCard = 'NO FOOLING'

// Now only fields validated with this instance
// will use NO FOOLING as the error message
```

### Validations

The simplest way to create a custom validation is to pass a function to the `type` property instead of a `Validator` object.

Make sure the function returns `false` if the input is valid, or else an error string if it is invalid.

```jsx
function isBob(value) {
  if (value === 'Bob') {
    return false;
  } else {
    return 'Your name is not Bob.'
  }
}

var schema = {
  name: {type: isBob}
};
```

Custom validation functions are called with the **Formation instance context**, so you can access other properties and methods with `this`:

```jsx
function sameAsPassword(value) {
  if (value === this.linkField('password').value) {
    return false;
  } else {
    return 'Not the same as your password.'
  }
}

var schema = {
  password: {required: true},
  name: {type: sameAsPassword}
};
```


