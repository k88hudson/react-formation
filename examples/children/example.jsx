var React = require('react/addons');
var ComposableForm = require('../../src/form');

var CreateForm = ComposableForm.CreateForm;
var SubmitButton = ComposableForm.SubmitButton;
var ErrorMessage = ComposableForm.ErrorMessage;
// We need FormMixin so this child component
// can have access to the global form API
var FormMixin = ComposableForm.FormMixin;

var CreditCard = React.createClass({

  mixins: [FormMixin],

  render: function () {
    return (<div className="form-group">
      <label>Enter your credit card number:</label>
      <input type="number" valueLink={this.linkField('cardNumber')} />
      <ErrorMessage field="cardNumber" />
    </div>);
  }
});

var PersonalInfo = React.createClass({

  mixins: [FormMixin],

  render: function () {
    return (<div>
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
    </div>);
  }
});

var Form = CreateForm({
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
    },
    cardNumber: {
      type: 'number',
      label: 'Credit card number'
    }
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
