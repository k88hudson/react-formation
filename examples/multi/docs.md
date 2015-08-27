# Multi-part forms

react-formation also has support for form "groups", that will allow you to manage validation and submitting within each group.

### Creating the schema

Instead of passing an object to the schema property to the form configuration, pass an **array of objects** representing groups of fields. Groups will be named after their index.

```js
schema: [
  // This is group 0
  {
    amount: {
      type: 'number'
    }
  },
  // This is group 1
  {
    paymentType: {
      type: 'string'
    },
    cardNumber: {
      type: 'number'
    }
  }
]
```

Alternatively, you can include a `group` property with each field.

```js
schema: {
  amount: {
    type: 'number',
    group: 0
  }
  paymentType: {
    type: 'string',
    group: 1
  },
  cardNumber: {
    type: 'number',
    group: 1
  }
}
```

### Validating/submitting groups

You can trigger a "submit" attempt on a group by calling `this.submitGroup`:

```js
this.submitGroup(groupName, onSuccess, onFailure);
```

You may also use the `SubmitGroupButton` component:

```html
<SubmitGroupButton group={groupName} onSuccess={onSuccess} onFailure={onFailure} />
```

Note that the `onSuccess` and `onFailure` callbacks are optional.

#### Why submit a group?

You might want to trigger a submit on a group in order to:

* show `ErrorMessage` components for fields in that group
* trigger going to the next page in a multi-page form on `onSuccess`

#### Checking submit status

You can also check the "submit status" of any field manually with `this.didSubmit`:

```js
this.didSubmit('banana');
// Returns true if the group in which banana exists was submitted with submitGroup,
// or if the whole form was submitted.
```



