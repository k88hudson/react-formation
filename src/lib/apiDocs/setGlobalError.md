## `this.setGlobalError(fieldOrId, message)`

Sets a global error (from an asynchronous service/server) that may be related to a field or not.

If `fieldOrId` matches the name of a field in the schema, the error will be related to that field. It will be cleared immediately when the value of the field is changed by the user.

If `fieldOrId` is an arbitrary id (e.g. `SERVER_UNAVAILABLE`), it can be retrieved from `this.getGlobalErrors[fieldOrId]`. It will not be cleared until the form is re-submitted.

`message` can be a string or an array of strings.

If `message` is falsey, the global error for `fieldOrId` will be removed.
