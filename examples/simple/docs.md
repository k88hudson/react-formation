# Creating a form

To create a form, pass an configuration object to `CreateForm` similar to what you would to `React.createClass`.

You **must include**:

1. a `schema` property that defines all the fields in the form that will be submitted
2. an `onSuccess` method that gets called on a successful submit

You can use `this.submitForm()` to submit the form.
