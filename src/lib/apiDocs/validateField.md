## `this.getErrors(fieldName)`

Returns `false` if no errors were found when validating the field `fieldName`, otherwise an array of strings, where each string is an error message.

For example, if the field `email` must be an email:

```jsx
this.getErrorsField('email');
// => ['Email must be an email.']
```
