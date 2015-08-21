# Errors

You can easily show validation errors by using the `ErrorMessage` component. Just pass in the name of the field to the `field` property.

```html
<ErrorMessage field="email" />
```

### When are errors displayed?

Errors are **always hidden** if the field is valid.

If the field is **invalid**, by default, `ErrorMessage` will only be shown after a user attempts to submit the form.

If you would like to show error messages immediately, or on some custom condition, you can pass an expression to the `show` property:

```html
// This will always show errors, if foo is invalid
<ErrorMessage field="foo" show={true}/>
```

### Style

By default, error messages are just a div with the classname `error`:

```html
<div class="error">Error message here</div>
```

However, you can pass `className` as a prop to `ErrorMessage` to override it.

