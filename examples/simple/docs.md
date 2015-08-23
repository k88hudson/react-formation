# Creating a form

To create a form, you can use the `render` function of `CreateForm` just like how you would use `React.createClass`:

```jsx
var Composable = require('react-composable-form');
var Form = Composable.CreateForm({
  render: function () {
    return (<form>

      <label>Name</label>
      <input type="text" name="name" />

      <label>Email</label>
      <input type="text" name="email" />

      <button>Submit</button>

    </form>);
  }
});
```

Next, add **a schema** property that defines all the fields in the form, and link corresponding inputs with `this.linkField`:

```jsx{3-6,12,15}
var Form = Composable.CreateForm({

  schema: {
    name: {required: true}
    email: {type: 'email'}
  },

  render: function () {
    return (<form>

      <label>Name</label>
      <input type="text" valueLink={this.linkField('name')} />

      <label>Email</label>
      <input type="text" valueLink={this.linkField('email')} />

      <button>Submit</button>

    </form>);
  }

});
```

Finally, add **an onSuccess** callback that gets called on a successful submit, and add `this.submitForm` as a callback to any submit buttons.

```jsx{8-10,21}
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

      <button onClick={this.submitForm}>Submit</button>

    </form>);
  }

});
```
