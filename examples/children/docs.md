# Child components

Inputs can be linked in child components too; all you have to do is include `FormMixin`

```js
var FormMixin = ComposableForm.FormMixin;

var Child = React.createClass({

  mixins: [FormMixin],

  render: function () {
    return (<div>
      <label>Name</label>
      <input type="text" name="name" valueLink={this.linkField('name')} />
      <ErrorMessage field="name" />
    </div>);
  }
});

```
