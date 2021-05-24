# Get started with React Formation v.2.0

[![Build Status](https://travis-ci.org/l198881/react-formation.svg)](https://travis-ci.org/k88hudson/react-formation)
[![Coverage Status](https://coveralls.io/repos/l198881/react-formation/badge.svg?branch=master&service=github)](https://coveralls.io/github/k88hudson/react-formation?branch=master)

## Install

You can install React Formation from npm by running `npm install react-formation`. If you are using common js, you can require it like this:

```jsx
Formation = ('react-formation');
```

## Create a Form

First, let's define the structure of your form. You can do that by using `CreateForm` just like how you would use `React.createClass`, including a `render` function:

```jsx{3}
 Formation = require('react-formation');

 Form = .CreateForm({
  render: () {
      <form>

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

```jsx{3-6,11,14}
 Form = Formation.CreateForm({

  getSchema: () {
     {
      name: {required: true},
      email: {validations: 'email'}
    };
  },

  render: function () {
     (<form>

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
 Form = Formation.CreateForm({

  getSchema: function () {
     {
      name: {required: true},
      email: {validations: 'email'}
    };
  },

  onSuccess: function (data) {
    console.log(data);
  },

  render: function () {
     (<form>

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

## More

Check out the guide and examples:

* [Creating a form](http://l198881.github.io/react-formation/#/examples/)
* [Schema](http://l198881.github.io/react-formation/#/examples/schema)
* [Linking field values](http://l198881.github.io/react-formation/#/examples/linking)
* [Submitting](http://l198881.github.io/react-formation/#/examples/submitting)
* [Errors](http://l198881.github.io/react-formation/#/examples/errors)
* [API](./src/lib/apiDocs)
* [Example: airbnb](http://l198881.github.io/react-formation/#/examples/airbnb)
