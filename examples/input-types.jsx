var React = require('react');
var {CreateForm, SubmitButton, ErrorMessage, FormMixin, Radio} = require('../src/form');

var Highlight = require('./lib/Prism.jsx');
var hljsClass = 'html';

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

      <Highlight className={hljsClass}>
        {`<input type="text" valueLink={this.linkField('name')} />`}
      </Highlight>

      <div className="form-group">
        <h4>Number input</h4>
        <label>Age</label>
        <input type="number" valueLink={this.linkField('age')} />
        <ErrorMessage field="age" />
      </div>

      <Highlight className={hljsClass}>
        {`<input type="number" valueLink={this.linkField('age')} />`}
      </Highlight>

    </div>);
  }
});

var CheckboxEg = React.createClass({
  mixins: [FormMixin],
  render: function () {
    return (<div>
      <h4>Checkbox</h4>
      <label><input type="checkbox" checkedLink={this.linkField('likeDogs')} /> Do you like dogs?</label>

      <Highlight className={hljsClass}>
        {`<label>
  <input type="checkbox" checkedLink={this.linkField('likeDogs')} />
  Do you like dogs?
</label>`}
      </Highlight>
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

      <Highlight className={hljsClass}>
        {`var link = this.linkField('color');
<label><Radio name="color" value="blue" radioLink={link} /> Blue</label>
<label><Radio name="color" value="red" radioLink={link} /> Red</label>
<label><Radio name="color" value="green" radioLink={link} /> Green</label>`}
      </Highlight>
    </div>);
  }
});

var SelectEg = React.createClass({
  mixins: [FormMixin],
  render: function () {
    return (<div>
      <h4>Select</h4>
      <select valueLink={this.linkField('country')}>
        <option value="" />
        <option value="Canada">Canada</option>
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
      </select>
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
    },
    country: {
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
      <SelectEg />
      <p><SubmitButton /></p>
    </form>);
  }
});

module.exports = Form;

