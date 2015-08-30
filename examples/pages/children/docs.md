# Building modular UI

One of the key philosophies of React Formation is that **form frameworks should simplify internal data management without enforcing any particular UI patterns or structures**.

This allows you to optimize for a great user experience when making decisions about your UI while not having to worry about state bugs, validation, and data synchronization.

## Child components

Any methods available in the root form component, such as `this.linkField` or `this.submitForm`, can be added to any level of child component with `FormMixin`:

```jsx{4}
var Formation = require('react-formation');
var Child = React.createClass({

  mixins: [Formation.FormMixin],

  render: function () {
    return (<div>
      <label>Name</label>
      <input type="text" name="name" valueLink={this.linkField('name')} />
      <ErrorMessage field="name" />
    </div>);
  }
});
```
