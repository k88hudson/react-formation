var React = require('react');
var ComposableForm = require('../../src/form.jsx');

var CreateForm = ComposableForm.CreateForm;
var ErrorMessage = ComposableForm.ErrorMessage;

var PersonalInfo = CreateForm({

  schema: {
    name: {
      label: 'Name',
      type: 'string',
      required: true
    },
    email: {
      label: 'Email',
      type: 'email',
      required: true
    }
  },

  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },

  render: function () {
    return (<form style={{padding: 20, backgroundColor: this.props.backgroundColor}}>

      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" valueLink={this.linkField('name')} />
        <ErrorMessage show={this.props.showErrorsImmediately} field="name" />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="text" name="email" valueLink={this.linkField('email')} />
        <ErrorMessage show={this.props.showErrorsImmediately} field="email" />
      </div>

      <p><button onClick={this.submitForm}>Submit</button></p>

    </form>);
  }
});


var Form = React.createClass({
  render: function () {
    return (<div>
      <h3>Version 1: Show errors after submit, white background</h3>
      <PersonalInfo />

      <h3>Version 1: Show error immediately, yellow background</h3>
      <PersonalInfo showErrorsImmediately backgroundColor={'#FFEEBC'} />
    </div>);
  }
});

module.exports = Form;

