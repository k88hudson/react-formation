var React = require('react');
var {CreateForm, SubmitButton, ErrorMessage, FormMixin, Radio} = require('../../../src/form');

var Highlight = require('../../lib/Prism.jsx');
var hljsClass = 'html';

var InputEg = React.createClass({
  mixins: [FormMixin],
  render: function () {
    return (<div>

      <div className="form-group">
        <h4>Text input</h4>
        <label>Name</label>
        <input validations="text" valueLink={this.linkField('name')} />
        <ErrorMessage field="name" />
      </div>

      <Highlight className={hljsClass}>
        {`<input validations="text" valueLink={this.linkField('name')} />`}
      </Highlight>

      <div className="form-group">
        <h4>Number input</h4>
        <label>Age</label>
        <input validations="number" valueLink={this.linkField('age')} />
        <ErrorMessage field="age" />
      </div>

      <Highlight className={hljsClass}>
        {`<input validations="number" valueLink={this.linkField('age')} />`}
      </Highlight>

    </div>);
  }
});

var CheckboxEg = React.createClass({
  mixins: [FormMixin],
  render: function () {
    return (<div>
      <h4>Checkbox</h4>
      <label><input validations="checkbox" checkedLink={this.linkField('likeDogs')} /> Do you like dogs?</label>

      <Highlight className={hljsClass}>
        {`<label>
  <input validations="checkbox" checkedLink={this.linkField('likeDogs')} />
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
  getSchema: function () {
    return {
      name: {
        label: 'Name',
        validations: 'string'
      },
      age: {
        label: 'Age',
        validations: 'number'
      },
      likeDogs: {
        label: 'Do you like dogs',
        validations: 'boolean'
      },
      color: {
        validations: 'string'
      },
      country: {
        validations: 'string'
      }
    };
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

