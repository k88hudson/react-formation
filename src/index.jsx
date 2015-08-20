var React = require('react/addons');
var {CreateForm, SubmitButton, ErrorMessage, FormMixin, Radio} = require('./form.jsx');
var {StepByStep, NextButton} = require('./step.jsx');

var Page = React.createClass({
  render: function () {
    return (<div hidden={!this.props.show}>
      {this.props.children}
    </div>);
  }
});

var Amount = React.createClass({
  mixins: [FormMixin, React.addons.LinkedStateMixin],
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
      <ul clasName="radio-group">
        <li><Radio name="amount" value={20} radioLink={linkField} /> $20</li>
        <li><Radio name="amount" value={10} radioLink={linkField} /> $10</li>
        <li><Radio name="amount" value={this.state.customValue || 0} radioLink={linkField}/> <input value={this.state.customValue} onChange={this.onCustomChange}/></li>
      </ul>
      <ErrorMessage hidden={!this.didSubmit()} field="amount" />
      <p hidden={this.validateField('amount')}><NextButton /></p>
    </div>);
  }
});

var CreditCard = React.createClass({

  mixins: [FormMixin],

  render: function () {
    return (<div className="form-group">
      <label>Enter your credit card number:</label>
      <input type="number" valueLink={this.linkField('cardNumber')} onBlur={this.onBlur} />
      <ErrorMessage hidden={!this.didSubmit()} field="cardNumber" />
      <p hidden={this.validateField('cardNumber')}><NextButton /></p>
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

var Form = CreateForm({
  schema: {
    amount: {
      required: true,
      label: 'Amount',
      type: 'number'
    },
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
      label: 'Credit card number',
      required: true
    }
  },
  onSuccess: function (data) {
    console.log(data);
  },
  render: function () {
    return (<form>
      <StepByStep>
        <CreditCard title="Payment" />
        <Amount title="Amount" />
        <PersonalInfo title="Info" />
      </StepByStep>
    </form>);
  }
});

React.render(<Form />, document.getElementById('app'));
