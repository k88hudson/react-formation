var React = require('react/addons');
var {CreateForm, SubmitButton, SubmitGroupButton, ErrorMessage, FormMixin, Radio} = require('../../src/form.jsx');
var {StepByStep, NextButton, StepMixin} = require('../../src/lib/step.jsx');

var COUNTRY = ['Canada', 'US', 'Mexico'];
var PROVINCES = {
  Canada: ['Ontario', 'Quebec'],
  US: ['New York', 'Washington']
};

var Page = React.createClass({
  render: function () {
    return (<div hidden={!this.props.show}>
      {this.props.children}
    </div>);
  }
});

var Amount = React.createClass({
  mixins: [FormMixin, StepMixin],
  getInitialState: function () {
    return {
      customValue: null
    };
  },
  onCustomChange: function (e) {
    var val = e.target.value;
    this.setState({
      customValue: val
    });
    this.linkField('amount').requestChange(val);
  },
  render: function () {
    var linkField = this.linkField('amount');
    return (<div>
      <label>Amount:</label>
      <ul className="radio-group">
        <li><Radio name="amount" value={20} radioLink={linkField} /> $20</li>
        <li><Radio name="amount" value={10} radioLink={linkField} /> $10</li>
        <li><Radio name="amount" value={this.state.customValue || 0} radioLink={linkField}/> <input value={this.state.customValue} onChange={this.onCustomChange}/></li>
      </ul>
      <ErrorMessage field="amount" />
      <p><SubmitGroupButton group={this.props.index} onSuccess={this.goNext} /></p>
    </div>);
  }
});

var CreditCard = React.createClass({

  mixins: [FormMixin, StepMixin],

  render: function () {
    var provinces = PROVINCES[this.linkField('country').value];
    return (<div className="form-group" {...this.props}>
      <label>Enter your credit card number:</label>
      <input type="number" valueLink={this.linkField('cardNumber')} />
      <ErrorMessage field="cardNumber" />

      <label>Enter your name</label>
      <input type="text" valueLink={this.linkField('cardName')} />
      <ErrorMessage field="cardName" />

      <label>Enter your address</label>
      <textarea valueLink={this.linkField('cardAddress')} />
      <ErrorMessage field="cardAddress" />

      <label>Enter your country</label>
      <select valueLink={this.linkField('country')}>
        <option value="" />
        {COUNTRY.map(country => <option value={country} key={country}>{country}</option>)}
      </select>
      <ErrorMessage field="country" />

      <div hidden={!provinces}>
        <label>Enter your province</label>
        <select valueLink={this.linkField('province')}>
          <option value="" />
          {provinces && provinces.map(province => <option value={province} key={province}>{province}</option>)}
        </select>
      </div>
      <ErrorMessage field="province" />
    </div>);
  }
});

var Payment = React.createClass({

  getInitialState: function () {
    return {
      didSubmit: false
    };
  },

  mixins: [FormMixin, StepMixin],

  render: function () {
    var paymentTypeLink = this.linkField('paymentType');
    return (<div>
      <ul className="radio-group">
        <li>
          <Radio name="paymentType" value="creditCard" radioLink={paymentTypeLink} />
          Credit Card
        </li>
        <li>
          <Radio name="paymentType" value="paypal" radioLink={paymentTypeLink} />
          Paypal
        </li>
      </ul>
      <ErrorMessage field="paymentType" />
      <CreditCard hidden={paymentTypeLink.value !== 'creditCard'} />
      <p><SubmitGroupButton group={this.props.index} onSuccess={this.goNext} /></p>
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

      <p><SubmitButton /></p>
    </div>);
  }
});

var ThankYou = React.createClass({
  render: function () {
    return (<div>
      <h1>Thank you!!</h1>
    </div>);
  }
});

function requiredIfCreditCard() {
  if (this.state.paymentType === 'creditCard') {
    return true;
  }
}

var Form = CreateForm({
  schema: [
    {
      amount: {
        required: true,
        label: 'Amount',
        type: 'number'
      }
    },
    {
      paymentType: {
        type: 'string',
        label: 'Payment type',
        required: true
      },
      cardNumber: {
        required: requiredIfCreditCard,
        type: 'number',
        label: 'Credit card number'
      },
      cardName: {
        required: requiredIfCreditCard,
        type: 'string',
        label: 'Credit card name'
      },
      cardAddress: {
        required: requiredIfCreditCard,
        type: 'string',
        label: 'Credit card address'
      },
      country: {
        required: requiredIfCreditCard,
        type: 'string',
        label: 'Country'
      },
      province: {
        required: function () {
          if (this.state.paymentType !== 'creditCard') return false;
          if (PROVINCES[this.state.country]) return true;
        },
        type: 'string',
        label: 'Province'
      }
    },
    {
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
    }
  ],
  onSuccess: function (data) {
    this.refs.sequence.goNext();
  },
  render: function () {
    return (<form>
      <StepByStep interactiveNav={false} ref="sequence">
        <Amount index={0} title="Amount" />
        <Payment index={1} title="Payment" />
        <PersonalInfo index={2} title="Info" />
        <ThankYou index={3} title="Thanks" />
      </StepByStep>
    </form>);
  }
});

module.exports = Form;
