var React = require('react/addons');
var {CreateForm, SubmitButton, ErrorMessage, FormMixin} = require('./form.jsx');

var CreditCard = React.createClass({

  mixins: [FormMixin],

  render: function () {
    return (<div className="form-group">
      <label>Enter your credit card number:</label>
      <input valueLink={this.linkField('cardNumber')} onBlur={this.onBlur} />
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
        <input name="name" valueLink={this.linkField('name')} />
        <ErrorMessage hidden={!this.didSubmit()} field="name" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input name="email" valueLink={this.linkField('email')} />
        <ErrorMessage hidden={!this.didSubmit()} field="email" />
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
    console.log(data);
  },
  render: function () {
    return (<form>
      <PersonalInfo />
      <CreditCard />
      <p><SubmitButton /></p>
    </form>);
  }
});

React.render(<Form />, document.getElementById('app'));

