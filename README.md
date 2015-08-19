# Guide

Using this form library, you can

* Create forms with a schema, including validations
* Link inputs in child components back to the form
* Handle submitting and showing errors with helper components
* Get the "valid" or "submit attempt" state of the entire form at any time

## Creating a form

To create a form, pass an configuration object to `CreateForm` similar to what you would to `React.createClass`. You **must include**:

1. a `schema` property that defines all the fields in the form that will be submitted
2. an `onSuccess` method that gets called on a successful submit

```js
var CreateForm = require('form.jsx').CreateForm;

var Form = CreateForm({
  schema: {
    name: {
      required: true,
      label: 'Name',
      type: 'string'
    },
    email: {
      required: true,
      label: 'Email',
      type: 'email'
    },
    cardNumber: {
      type: 'number',
      label: 'Credit card number'
    }
  },
  onSuccess: function (data) {
    console.log(data);
  },
  render: function () {
    return (<form>

      ....

    </form>);
  }
});
```

## Schema

A schema should be an object, where each key represents a unique field. Each key's value is an object with can contain:

* initial: the initial value the form field starts with (optional)
* required: true/false
* type: currently implemented types include `number` and `email`
* label: this will show up in error messages

Example:
```js
schema: {
  name: {
    initial: 'Bob Jones',
    required: true,
    label: 'Name'
  },
  email: {
    required: true,
    label: 'Email',
    type: 'email'
  },
  cardNumber: {
    type: 'number',
    label: 'Credit card number'
  }
}
```

## Linking field values

You can inputs to the form via the `valueLink` property. All you need to do is call `this.linkField` with the name of the field (for more about `valueLink`, see [React's Docs on Two Way Binding Helpers](https://facebook.github.io/react/docs/two-way-binding-helpers.html)).

Keep in mind if you are adding inputs to child components of the form, you will need to include the `FormMixin` mixin.

```js
var {CreateForm, FormMixin} = require('form.jsx').CreateForm;

var Form = CreateForm({
  schema: {
    name: {
      required: true
    },
    age: {
      required: true
    }
  },
  ...
  render: function () {
    return (<form>
      <Child />
      <input valueLink={this.linkField('name')} />
    </form>);
  }
});

var Child = React.createClass({

  // Don't forget the mixin!
  mixins: [FormMixin],

  render: function () {
    return <input valueLink={this.linkField('age')} />
  }
});

```

## Submitting

To submit the form, you can call `this.submitForm` or use the `<SubmitButton />` component.

Make sure you define an `onSuccess` method on the form configuration object:

```js
var {CreateForm, SubmitButton} = require('form.jsx').CreateForm;

var Form = CreateForm({
  schema: {
    name: {
      required: true,
      label: 'Name'
    }
  },
  onSuccess: function (data) {
    console.log(data);
  },
  onClick: function (e) {
    e.preventDefault();
    this.submitForm();
  },
  render: function () {
    return (<form>
      <input valueLink={this.linkField('name')} />
      <SubmitButton />
      <button onClick={this.onClick}>This will also work</button>
    </form>);
  }
});

```

## Errors

You can easily show validation errors by using the `<ErrorMessage /> component. Simply pass in the name of the field to the `field` property.

```js
var {CreateForm, ErrorMessage} = require('form.jsx').CreateForm;

var Form = CreateForm({
  schema: {
    email: {
      required: true,
      type: 'email',
      label: 'Email'
    }
  },
  ...
  render: function () {
    return (<form>
      <input valueLink={this.linkField('email')} />
      <ErrorMessage field="email" />
    </form>);
  }
});

```

If you only want to show the error message some of the time (for example, only after a submit attempt), you can use the `hidden` property.

Remember you can get the `didSubmit` state in child components by using `this.didSubmit()` from the `FormMixin`.

```js
var {CreateForm, ErrorMessage} = require('form.jsx').CreateForm;

var Form = CreateForm({
  schema: {
    email: {
      required: true,
      type: 'email',
      label: 'Email'
    }
  },
  ...
  render: function () {
    return (<form>
      <input valueLink={this.linkField('email')} />
      <ErrorMessage hidden={!this.didSubmit()} field="email" />
    </form>);
  }
});
```

# API

## `FormMixin`

### `this.isValid()`

Returns `true` or `false` depending on if the entire form is valid.

### `this.didSubmit()`

Returns `true` or `false` depending on if the user tried to submit the form yet or not.

### `this.submitForm()`

Will call `this.onSuccess` with the entire form's data if the form is valid.

### `this.linkField(fieldName)`

Returns a `valueLink` for an input to be linked to a form field value. Example usage:

```
<input valueLink={this.linkField('email')} />
```

### `this.validateField(fieldName)`

Returns `false` if no errors were found when validating the field `fieldName`, otherwise an array of strings, where each string is an error message.

For example, if the field `email` must be an email:

```js
this.validateField('email');
// => ['Email must be an email.']
```



