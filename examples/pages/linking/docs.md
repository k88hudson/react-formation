# Adding inputs

### Text inputs

The easiest way to link `text` inputs (as well as `number`, `password` and many other elements) to the form is with their build-in `valueLink` property. All you need to do is call `this.linkField(field)` with the name of the field as defined in your form's schema.

```jsx
<input valueLink={this.linkField('name')} />
```

See [React's Docs on Two Way Binding Helpers](https://facebook.github.io/react/docs/two-way-binding-helpers.html) for more info about the `valueLink` property.

Keep in mind if you are adding inputs to child components of the form, you will need to include the `FormMixin` bundled with react-formations.

### Checkboxes

Checkboxes work a little bit differently in React; instead of `valueLink`, used `checkedLink`:

```jsx
<input type="checkbox" checkedLink={this.linkField('isHappy')} />
```

### Radio Buttons

Radio buttons unfortunately do not support any form of two way binding out of the box; however, you can use the `<Radio />` component bundled with react-formations:

```jsx
var Radio = require('react-formations').Radio;
var link = this.linkField('color');

<Radio name="color" value="blue" radioLink={link} /> Blue
<Radio name="color" value="red" radioLink={link} /> Red
<Radio name="color" value="green" radioLink={link} /> Green
```

Make sure you use the same `name` property for all corresponding radio buttons.

### Manually linking

If you want, you can always manually update/access values using `this.linkField`:

```jsx
var link = this.linkField('foo');

// Update the value. You could put this in an onChange handler
link.requestUpdate('new value');

// Get the current value
console.log(link.value);
// => 'new value'
```
