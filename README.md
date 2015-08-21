## Important note

At current time of writing, this is a component API experiment -- the validation support etc. is still in progress.

##  What it does

Using this form library, you can

* Create forms with a schema, including validations
* Link inputs in child components back to the form
* Handle submitting and showing errors with helper components
* Get the "valid" or "submit attempt" state of the entire form at any time

## Rationale

### Maintain a single source of truth

Handling any kind of nested display and control of user input can be tricky in React. Generally, we want to **maintain a single source of truth** for our form's data instead of fragmenting it down the component tree; however, this can become overly complex, verbose, and/or fragile if the components get too nested or the data model of the form is very large.

Inspired by `react-router`, React-composable-forms uses a top-level schema in combination with React's `context` feature to maintain a consistent api at all levels of the component tree.

## Guide and examples

Check out [the guide and examples](http://k88hudson.github.io/react-composable-form/www).

*[Creating a form](./examples/simple/docs.md)
*[Schema](./examples/schema/docs.md)
*[Linking field values](./examples/linking/docs.md)
*[Submitting](./examples/submitting/docs.md)
*[Errors](./examples/errors/docs.md)
*[API](./src/lib/apiDocs)
