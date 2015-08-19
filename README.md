# Form

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

You can link values in child components of the form via `this.linkField`.

If you are using inputs, you can use the `valueLink` property together with `this.linkField`. Keep in mind if you are adding inputs to child components of the form, you will need to use the `FormMixin` mixin.

```
var Form = CreateForm({
  schema: {
    name: {
      required: true,
      label: 'Name'
    }
  },
  ...
  render: function () {
    return (<form>
      <input valueLink={this.linkField('name')} />
    </form>);
  }
});

```

## Submitting

To submit the form, you can call `this.submitForm` or use the `<SubmitButton` component.

Make sure you define an `onSuccess` method on the form configuration object:

```
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




