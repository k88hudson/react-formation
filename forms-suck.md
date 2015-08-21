# Forms are hard


## Points of reference

I looked at: 

* HTML forms
* Angular (some of our old apps)
* jQuery (old donate form)
* React (new donate form, login)

## Conclusions

The Angular, jQuery, and React implementations were:

* verbose
* too rigid to easily allow for new fields or changes in structure
* error handling logic is complex, under-abstracted
* prone to state bugs

HTML forms (i.e. no javascript) are *much* simpler and less rigit, but the mechanisms available for validation and error messages are too primitive to allow for a good user experience.

Verdict: they all suck.


## Why are forms hard?

### Large and complex data models

Even a simple email field has:

* a starting value
* a current value
* a human-readable label
* a machine-readable label
* multiple validations

Forms and form sections also have their own state, such as whether users have tried to submit the form, or whether the entire form is valid.


### Good user experience requires extremely variable UI structures

Wouldn't it be nice if we could just loop through our data model and generate inputs?

Unfortunately, building a good user experience often requires a lot of nested html structures and classes specific to the needs of each field/section.

### Large and complex data models + variable nested UI = ultimate sadness