var React = require('react');
var ComposableForm = require('../../src/form.jsx');

var CreateForm = ComposableForm.CreateForm;
var SubmitButton = ComposableForm.SubmitButton;
var ErrorMessage = ComposableForm.ErrorMessage;

var Form = CreateForm({

  // This defines all the fields in the form
  schema: {
    name: {
      required: true,
      label: 'Name',
      type: 'string'
    },
    email: {
      required: true,
      label: 'Email',
      type: 'email'
    }
  },

  // This code is run when the form is valid and submitted
  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },

  render: function () {
    return (<form>

      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" valueLink={this.linkField('name')} />
        <ErrorMessage field="name" />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="text" name="email" valueLink={this.linkField('email')} />
        <ErrorMessage field="email" />
      </div>

      <p><SubmitButton /></p>

    </form>);
  }
});

module.exports = Form;

