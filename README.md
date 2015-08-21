# React composable forms

## Important note

At current time of writing, this is a component API experiment -- the validation support etc. is still in progress.

##  What it does

Using this form library, you can

* Create forms with a schema, including validations
* Link inputs in child components back to the form
* Handle submitting and showing errors with helper components
* Get the "valid" or "submit attempt" state of the entire form at any time

## Rationale

### Maintain a single source of truth in any component structure

Handling any kind of nested display and control of user input can be tricky in React. In order to prevent synchronization errors, we want to maintain a single source of truth for our form's data instead of fragmenting it down the component tree; however, this can become overly complex, verbose, and/or fragile if the components get too nested or the data model of the data set is very large.

Inspired by `react-router`, react-composable-forms uses a top-level schema in combination with React's `context` feature to maintain a consistent api at all levels of the component tree.

### Integrate existing input components and conventions

Any form system that requires the use of generated inputs or specific input component structures quickly becomes too rigid except for the simplest of forms.

react-composable-forms allows you to use **any input or component you like**, in any html structure you like. Links back to the single source of truth are managed via React's two-way-binding utility, which can be added directly to native inputs or controlled manually in an `onChange` handler.

### Simplify display of errors

No matter how you chose to validate your data, displaying error messages almost always requires a lot of complex logic from multiple sources: did the user attempt to submit? Are there any errors? Is the field required?

react-composable-forms attemps to simplify this by providing a means of tracking submit status and validity/errors for each field at the top level component, and exposing this information to all child components via the context API.

It also includes an <ErrorMessage /> component with good default behaviour in both single and multi form contexts.

## Guide and examples

Check out [the guide and examples](http://k88hudson.github.io/react-composable-form/www).

* [Creating a form](./examples/simple/docs.md)
* [Schema](./examples/schema/docs.md)
* [Linking field values](./examples/linking/docs.md)
* [Submitting](./examples/submitting/docs.md)
* [Errors](./examples/errors/docs.md)
* [API](./src/lib/apiDocs)
