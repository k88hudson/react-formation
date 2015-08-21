# Linking field values

### With valueLink and this.linkField

The easiest way to link inputs and other elements to the form is via React's build-in `valueLink` property. All you need to do is call `this.linkField(field)` with the name of the field as defined in your form's schema.

See [React's Docs on Two Way Binding Helpers](https://facebook.github.io/react/docs/two-way-binding-helpers.html) for more info about the `valueLink` property.

```html
<input valueLink={this.linkField('name')} />
```

Keep in mind if you are adding inputs to child components of the form, you will need to include the `FormMixin` bundled with react-composable-forms.

### Checkboxes

Checkboxes work a little bit differently in React; instead of `valueLink`, used `checkedLink`:

```html
<input type="checkbox" checkedLink={this.linkField('isHappy')} />
```

### Radio Buttons

Radio buttons unfortunately do not support any form of two way binding out of the box; however, you can use the `<Radio />` component bundled with react-composable-forms:

```
var Radio = require('react-composable-forms').Radio;
var link = this.linkField('color');

<Radio name="color" value="blue" radioLink={link} /> Blue
<Radio name="color" value="red" radioLink={link} /> Red
<Radio name="color" value="green" radioLink={link} /> Green
```

Make sure you use the same `name` property for all corresponding radio buttons.

### Manually linking

If you want, you can always manually update/access values using `this.linkField`:

```javascript
var link = this.linkField('foo');

// Update the value. You could put this in an onChange handler
link.requestUpdate('new value');

// Get the current value
console.log(link.value);
// => 'new value'
```
