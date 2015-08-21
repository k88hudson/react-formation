# Important note

At current time of writing, this is a component API experiment -- the validation support etc. **is extremely naive and not ready for production**.

# How to test this out

I haven't published this or anything yet, you can try it out by cloning this repo and running:

`npm start`

# Guide

Using this form library, you can

* Create forms with a schema, including validations
* Link inputs in child components back to the form
* Handle submitting and showing errors with helper components
* Get the "valid" or "submit attempt" state of the entire form at any time

## Complete example

Check out [the examples](./examples)

## [Creating a form](./examples/simple/docs.md)

## Schema

A schema should be an object, where each key represents a unique field. Each key's value is an object with can contain:

* initial: the initial value the form field starts with (optional)
* required: true/false OR a function
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

TODO: validation, conditional required

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

## [Errors](./examples/errors/docs.md)

## [API](./src/lib/apiDocs)
