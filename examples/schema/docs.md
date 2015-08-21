# Schema

A schema should be an object, where each key represents a unique field. Each key's value is an object which can contain:

* `initial`: the initial value the form field starts with (optional)
* `required`: true/false OR a function
* `type`: currently implemented types include `number` and `email`
* `label`: this will show up in error messages

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
