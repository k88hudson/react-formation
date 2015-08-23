# Creating a form

To create a form, you can use `CreateForm` just like how you would use `React.createClass`:

```jsx
var Composable = require('react-composable-form');
var Form = Composable.CreateForm({
  ...
});
```

First, add **a schema** property that defines all the fields in the form:

```jsx
var Form = Composable.CreateForm({

  schema: {
    name: {required: true}
    email: {type: 'email'}
  }

});
```

Next, add **an onSuccess** callback that gets called on a successful submit.

```jsx
var Form = Composable.CreateForm({

  schema: {
    name: {required: true}
    email: {type: 'email'}
  },

  onSuccess: function (data) {
    console.log(data);
  }

});
```

Finally, add elements to the render function:

```jsx
var Form = Composable.CreateForm({

  schema: {
    name: {required: true}
    email: {type: 'email'}
  },

  onSuccess: function (data) {
    console.log(data);
  },

  render: function () {
    return (<form>

      <label>Name</label>
      <input type="text" valueLink={this.linkField('name')} />

      <label>Email</label>
      <input type="text" valueLink={this.linkField('email')} />

      <SubmitButton />

    </form>)
  }

});
```
