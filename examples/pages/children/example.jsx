var React = require('react/addons');
var Formation = require('../../../src/form');

var CreateForm = Formation.CreateForm;
var SubmitButton = Formation.SubmitButton;
var ErrorMessage = Formation.ErrorMessage;
var Validator = Formation.Validator;

// We need FormMixin so this child component
// can have access to the global form API
var FormMixin = Formation.FormMixin;

var CreditCard = React.createClass({

  mixins: [FormMixin],

  render: function () {
    return (<div className="form-group">
      <label>Enter your credit card number (try 4111111111111111):</label>
      <input validations="number" valueLink={this.linkField('cardNumber')} />
      <ErrorMessage field="cardNumber" />
    </div>);
  }
});

var PersonalInfo = React.createClass({

  mixins: [FormMixin],

  render: function () {
    return (<div>
      <div className="form-group">
        <label>Username</label>
        <input validations="text" name="username" valueLink={this.linkField('username')} />
        <ErrorMessage field="username" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input validations="text" name="email" valueLink={this.linkField('email')} />
        <ErrorMessage field="email" />
      </div>
    </div>);
  }
});

var Form = CreateForm({
  getSchema: function () {
    return {
      username: {
        required: true,
        label: 'Username',
        validations: Validator.alpha()
      },
      email: {
        required: true,
        label: 'Email',
        validations: Validator.email()
      },
      cardNumber: {
        validations: Validator.creditCard(),
        label: 'Credit card'
      }
    };
  },
  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },
  render: function () {
    return (<form>
      <PersonalInfo />
      <CreditCard />
      <p><SubmitButton /></p>
    </form>);
  }
});

module.exports = Form;
