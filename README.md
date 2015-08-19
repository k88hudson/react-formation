# Form

Using this form library, you can

1. Create forms with a schema, including validations
2. Link inputs in child components back to the form
3. Handle submitting and showing errors with helper components
4. Get the "valid" or "submit attempt" state of the entire form at any time

To create a form, pass an object to `CreateForm` that includes a `schema` property and an `onSuccess` method:

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




