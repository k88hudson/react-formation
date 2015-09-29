# Validating on the server

Some validations can only happen on the server Some examples of this include:

* The server can't be reached
* A credit card is declined
* A username is taken


To support this kind of error states, we can use the `setGlobalError` method.

## Setting global errors that refer to the whole form

If you want to set an error that doesn't refer to any particular field (or refers to multiple fields) you can call `this.setGlobalError` with an ID to identify that error and an error message.

For example, let's say we try to send our data to the server but it can't be reached:

```jsx{4}
onSuccess: function (data) {
  post('/api/submit', data, (response) => {
    if (response.status !== 200 && response.body === 'SERVER_UNAVAILABLE') {
      this.setGlobalError('SERVER_UNAVAILABLE', 'Sorry! The server was not reachable');
    }
  });
}
```

## Setting global errors that refer to specific fields

Say we want to check if a credit card (which appears to be valid) is accepted when the user submits the form.

In our `onSuccess` method, let's send the data to the server and check to see if the response contains any errors. If there *are* errors, we call `this.setGlobalError` with the name of the field and the error as a string.

```jsx{13}
var Form = CreateForm({
  getSchema: function () {
    return {
      creditCard: {
        validations: Validator.creditCard()
      }
    };
  },

  onSuccess: function (data) {
    post('/api/submit', data, (response) => {
      if (response.status !== 200 && response.body === 'CARD_DECLINED') {
        this.setGlobalError('creditCard', 'Credit card was declined.');
      }
    });
  },

  render: function () {
    return (<form>
      <input type="text" valueLink={this.linkField('creditCard')} />
      <button onClick={this.submitForm}>Submit</button>
    </form>);
  }
});
```

#### Multiple errors

You can pass multiple errors to `this.setGlobalError` as an array as necessary. Keep in mind whatever you pass in will overwrite any existing global errors on that field.

```jsx
this.setGlobalError('creditCard', [
  'Credit card was declined.',
  'Credit card is expired.'
]);
```

This also works for general global errors.

#### Editing a field will clear its global errors

If you change the value of a field after a global error is set, React Formation *clear the error*.

For example, let's say the user tries the username `foo`. A response from the server sets a global error `Username taken`. Once the user starts editing the username field again, the global error disappears, since presumably the user is trying a new username.
