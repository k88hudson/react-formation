var React = require('react/addons');
var {CreateForm, SubmitButton, ErrorMessage, FormMixin, Radio, MultiForm} = require('./form.jsx');
var {StepByStep, NextButton, StepMixin} = require('./step.jsx');

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

var Amount = CreateForm({
  mixins: [StepMixin],
  schema: {
    amount: {
      required: true,
      label: 'Amount',
      type: 'number'
    }
  },
  onSuccess: function (data) {
    console.log(data);
    this.goNext();
  },
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
      <ErrorMessage hidden={!this.didSubmit()} field="amount" />
      <SubmitButton>Next</SubmitButton>
    </div>);
  }
});


var CreditCard = React.createClass({

  mixins: [FormMixin],

  render: function () {
    var provinces = PROVINCES[this.linkField('country').value];
    return (<div className="form-group" {...this.props}>
      <label>Enter your credit card number:</label>
      <input type="number" valueLink={this.linkField('cardNumber')} />
      <ErrorMessage hidden={!this.didSubmit()} field="cardNumber" />

      <label>Enter your name</label>
      <input type="text" valueLink={this.linkField('cardName')} />
      <ErrorMessage hidden={!this.didSubmit()} field="cardName" />

      <label>Enter your address</label>
      <textarea valueLink={this.linkField('cardAddress')} />
      <ErrorMessage hidden={!this.didSubmit()} field="cardAddress" />

      <label>Enter your country</label>
      <select valueLink={this.linkField('country')}>
        <option value="" />
        {COUNTRY.map(country => <option value={country} key={country}>{country}</option>)}
      </select>
      <ErrorMessage hidden={!this.didSubmit()} field="country" />

      <div hidden={!provinces}>
        <label>Enter your province</label>
        <select valueLink={this.linkField('province')}>
          <option value="" />
          {provinces && provinces.map(province => <option value={province} key={province}>{province}</option>)}
        </select>
      </div>
      <ErrorMessage hidden={!this.didSubmit()} field="province" />

    </div>);
  }
});


function requiredIfCreditCard() {
  if (this.linkField('paymentType').value === 'creditCard') {
    return true;
  }
}

var Payment = CreateForm({
  mixins: [StepMixin],
  schema: {
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
  onSuccess: function (data) {
    this.goNext();
  },
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
      <CreditCard hidden={paymentTypeLink.value !== 'creditCard'} />
      <p><SubmitButton>Next</SubmitButton></p>
    </div>);
  }
});


var PersonalInfo = CreateForm({

  mixins: [StepMixin],
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

  onSuccess: function (data) {
    console.log(data);
    this.props.submitAll();
  },

  render: function () {
    return (<div>
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" valueLink={this.linkField('name')} />
        <ErrorMessage hidden={!this.didSubmit()} field="name" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="text" name="email" valueLink={this.linkField('email')} />
        <ErrorMessage hidden={!this.didSubmit()} field="email" />
      </div>

      <p><SubmitButton>Go</SubmitButton></p>
    </div>);
  }
});

var Test = CreateForm({
  mixins: [StepMixin],
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

  onSuccess: function (data) {
    console.log(data);
  },

  render: function () {
    return (<div>
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" valueLink={this.linkField('name')} />
        <ErrorMessage hidden={!this.didSubmit()} field="name" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="text" name="email" valueLink={this.linkField('email')} />
        <ErrorMessage hidden={!this.didSubmit()} field="email" />
      </div>
      <p><SubmitButton>Go</SubmitButton></p>
    </div>);
  }
});


var App = React.createClass({
  submitAll: function () {
  },
  componentDidMount: function () {
  },
  render: function () {
    return (<div>
      <StepByStep>
        <Amount title="Amount" />
        <Payment title="Payment" />
        <PersonalInfo title="Info" submitAll={this.submitAll} />
      </StepByStep>
    </div>);
  }
});

React.render(<App />, document.getElementById('app'));
