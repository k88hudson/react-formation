var React = require('react/addons');
var ComposableForm = require('../../src/form');

var CreateForm = ComposableForm.CreateForm;
var SubmitButton = ComposableForm.SubmitButton;
var ErrorMessage = ComposableForm.ErrorMessage;

var zxcvbn = require('zxcvbn');

var Form = CreateForm({
  schema: {
    username: {
      required: true,
      label: 'Username',
      type: function (val) {
        if (/^[a-zA-Z0-9\-]{1,20}$/.test(val)) return false;
        return 'Must be 1-20 characters long and use only "-" and alphanumeric symbols';
      }
    },
    email: {
      required: true,
      label: 'Email',
      type: 'email'
    },
    password: {
      required: true,
      label: 'Password',
      type: function (val) {
        if (val && zxcvbn(val).score > 0) return false;
        return 'Password is not strong enough';
      },
    },
    subscribe: {
      type: 'boolean'
    }
  },
  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },
  getPassStrength: function () {
    return this.state.password ? zxcvbn(this.state.password).score : -1;
  },
  passStrengthStrings: ['Not strong enough', 'Weak', 'OK', 'Good', 'Strong'],
  render: function () {
    var passStrength = this.getPassStrength();

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
          <div className={'password-strength strength-' + passStrength}>
            {passStrength >= 0 && this.passStrengthStrings[passStrength]}
            <span className="indicator" style={{width: ((passStrength + 1) * 20) + '%'}} />
          </div>
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
