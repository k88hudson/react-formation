# Get started

## Install

You can install React Formation from npm by running `npm install react-formation`. If you are using common js, you can require it like this:

```jsx
var Formation = require('react-formation');
```

## Create a Form

First, let's define the structure of your form. You can do that by using `CreateForm` just like how you would use `React.createClass`, including a `render` function:

```jsx{3}
var Formation = require('react-formation');

var Form = Formation.CreateForm({
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

Next, add **a `getSchema`** method that returns a schema defining all the fields in the form, and link corresponding inputs with `this.linkField`:

```jsx{3-8,14,17}
var Form = Formation.CreateForm({

  getSchema: function () {
    return {
      name: {required: true}
      email: {validations: 'email'}
    };
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

```jsx{10-12,23}
var Form = Formation.CreateForm({

  getSchema: function () {
    return {
      name: {required: true}
      email: {validations: 'email'}
    };
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

## Rendering a Form

You can use your new `Form` class just like you would any other React element, including passing props. For example, if you wanted to render it directly into `document.body`:

```jsx
React.render(<Form />, document.body);
```
