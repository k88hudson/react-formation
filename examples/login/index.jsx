var React = require('react/addons');
var ComposableForm = require('../../src/form');

var CreateForm = ComposableForm.CreateForm;
var SubmitButton = ComposableForm.SubmitButton;
var ErrorMessage = ComposableForm.ErrorMessage;

var Form = CreateForm({
  schema: {
    username: {
      required: true,
      label: 'Name',
      type: 'string'
    },
    email: {
      required: true,
      label: 'Email',
      type: 'email'
    },
    password: {
      required: true,
      label: 'Password',
      type: 'password',
    },
    subscribe: {
      type: 'boolean'
    }
  },
  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },
  render: function () {
    return (<form className="login-eg">

      <div className="body">
        <div className="form-group">
          <input placeholder="Username" type="text" valueLink={this.linkField('username')} />
          <ErrorMessage field="username" />
        </div>

        <div className="form-group">
          <input placeholder="Email" type="text" valueLink={this.linkField('email')} />
          <ErrorMessage field="email" />
        </div>

        <div className="form-group">
          <input placeholder="Password" type="password" name="password" valueLink={this.linkField('password')} />
          <ErrorMessage field="password" />
        </div>
      </div>

      <div className="submit-footer">
        <SubmitButton>Sign Up</SubmitButton>
      </div>
    </form>);
  }
});

module.exports = Form;
