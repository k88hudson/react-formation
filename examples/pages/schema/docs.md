# Schema

A schema should be an object returned by the method `getSchema, where each key represents a unique field. Each key's value is an object which can contain:

Property | Default | Description
---------|---------|-------------
`initial`| | The initial value the form field starts with (optional).
`required`| `false` | Can be true, false or a function that returns true or false. The function is evaluated in the context of the form component instance.
`type`| | A string (currently implemented types include `number` and `email`) or a custom function. The function should return `false` if the value is valid, or else a string representing the error message.
`label`| | This will be used in some error messages.

```js
getSchema: function () {
  return {
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
  };
}
```

TODO: validation, conditional required
