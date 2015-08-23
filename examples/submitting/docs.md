# Submitting

To submit the form, you can call `this.submitForm` or use the `<SubmitButton />` component.

```jsx
<SubmitButton />
<button onClick={this.submitForm}>This will also submit</button>
```

Make sure you define an `onSuccess` method on the form configuration object.
