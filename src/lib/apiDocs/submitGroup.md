### `this.submitGroup(groupName, onSuccess, onError)`

All fields in group `groupName` will be marked with a submit attempt, so errors will show up and `this.didSubmit(field)` will return `true` for those fields.

Will call `onSuccess` if all the fields in the group `groupName` are valid, or else it will call `onError`. Both callbacks are optional.
