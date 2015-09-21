var React = require('react/addons');
var Formation = require('../../../src/form');

var CreateForm = Formation.CreateForm;
var SubmitButton = Formation.SubmitButton;
var ErrorMessage = Formation.ErrorMessage;

var zxcvbn = require('zxcvbn');
var classnames = require('classnames');

var Form = CreateForm({
  getSchema: function () {
    return {
      username: {
        required: true,
        label: 'Username',
        validations: function (val) {
          if (/^[a-zA-Z0-9\-]{1,20}$/.test(val)) return false;
          return 'Must be 1-20 characters long and use only "-" and alphanumeric symbols';
        }
      },
      email: {
        required: true,
        label: 'Email',
        validations: 'email'
      },
      password: {
        required: true,
        label: 'Password',
        validations: function (val) {
          if (val && zxcvbn(val).score > 0) return false;
          return 'Password is not strong enough';
        },
      },
      subscribe: {
        validations: 'boolean'
      }
    }
  },

  getInitialState: function () {
    return {
      blurred: {}
    };
  },
  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },
  onBlur: function (field) {
    return () => {
      var blurred = this.state.blurred;
      blurred[field] = true;
      this.setState({blurred});
    }
  },
  getPassStrength: function () {
    return this.state.password ? zxcvbn(this.state.password).score : -1;
  },
  passStrengthStrings: ['Not strong enough', 'Weak', 'OK', 'Good', 'Strong'],

  render: function () {
    var passStrength = this.getPassStrength();
    return (<form className="login-eg animated fadeInUp">

      <div className="body">
        <div className="form-group">
          <label hidden={!this.props.showLabels}>Username</label>
          <input placeholder={this.props.showLabels ? '' : 'Username'} validations="text" onBlur={this.onBlur('username')} valueLink={this.linkField('username')} />
          <ErrorMessage show={this.state.blurred.username} field="username" />
        </div>

        <div className="form-group">
          <label hidden={!this.props.showLabels}>Email</label>
          <input placeholder={this.props.showLabels ? '' : 'Email'} validations="text" onBlur={this.onBlur('email')} valueLink={this.linkField('email')} />
          <ErrorMessage show={this.state.blurred.email} field="email" />
        </div>

        <div className="form-group">
          <label hidden={!this.props.showLabels}>Password</label>
          <input placeholder={this.props.showLabels ? '' : 'Password'} validations="password" name="password" onBlur={this.onBlur('password')} valueLink={this.linkField('password')} />
          <div className={'password-strength strength-' + passStrength}>
            {passStrength >= 0 && this.passStrengthStrings[passStrength]}
            <span className="indicator" style={{width: ((passStrength + 1) * 20) + '%'}} />
          </div>
          <ErrorMessage show={this.state.blurred.password} field="password" />
        </div>
      </div>

      <div className="submit-footer">
        <SubmitButton style={{backgroundColor: this.props.buttonColor}} >{this.props.signUpMessage || 'Sign Up'}</SubmitButton>
      </div>
    </form>);
  }
});

module.exports = Form;
