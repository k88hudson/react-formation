var React = require('react/addons');
var {CreateForm, SubmitButton, ErrorMessage, FormMixin, Radio} = require('../src/form.jsx');

var InputEg = React.createClass({
  mixins: [FormMixin],
  render: function () {
    return (<div>

      <div className="form-group">
        <h4>Text input</h4>
        <label>Name</label>
        <input type="text" valueLink={this.linkField('name')} />
        <ErrorMessage field="name" />
      </div>

      <div className="form-group">
        <h4>Number input</h4>
        <label>Age</label>
        <input type="number" valueLink={this.linkField('age')} />
        <ErrorMessage field="age" />
      </div>

    </div>);
  }
});

var CheckboxEg = React.createClass({
  mixins: [FormMixin],
  render: function () {
    return (<div>
      <h4>Checkbox</h4>
      <label><input type="checkbox" checkedLink={this.linkField('likeDogs')} /> Do you like dogs?</label>
    </div>);
  }
});

var RadioEg = React.createClass({
  mixins: [FormMixin],
  render: function () {
    return (<div>
      <h4>Radio</h4>
      <label><Radio name="color" value="blue" radioLink={this.linkField('color')} /> Blue</label>
      <label><Radio name="color" value="red" radioLink={this.linkField('color')} /> Red</label>
      <label><Radio name="color" value="green" radioLink={this.linkField('color')} /> Green</label>
    </div>);
  }
});

var Form = CreateForm({
  schema: {
    name: {
      label: 'Name',
      type: 'string'
    },
    age: {
      label: 'Age',
      type: 'number'
    },
    likeDogs: {
      label: 'Do you like dogs',
      type: 'boolean'
    },
    color: {
      type: 'string'
    }
  },
  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },
  render: function () {
    return (<form>
      <InputEg />
      <CheckboxEg />
      <RadioEg />
      <p><SubmitButton /></p>
    </form>);
  }
});

module.exports = Form;

