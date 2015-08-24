var React = require('react/addons');
var ComposableForm = require('../../src/form');
var classnames = require('classnames');

var CreateForm = ComposableForm.CreateForm;
var SubmitButton = ComposableForm.SubmitButton;
var ErrorMessage = ComposableForm.ErrorMessage;

var days = [];
var years = [];
for (var i = 2015; i > 1900; i--) {years.push(i);}
for (var j = 1; j < 32; j++) {days.push(j);}
var dateData = {
  years,
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  days
};

var Input = React.createClass({
  mixins: [ComposableForm.FormMixin],
  render: function () {
    var errors = this.validateField(this.props.field);
    var inputClass = classnames('input', {
      valid: this.didSubmit() && !errors,
      invalid: this.didSubmit() && errors
    });
    return (<div className="form-group">
      <ErrorMessage className="helper-error" field={this.props.field} />
      <input className={inputClass} type={this.props.type || 'text'} placeholder={this.props.label} valueLink={this.linkField(this.props.field)} />
    </div>);
  }
});

var Form = CreateForm({
  schema: {
    firstName: {
      required: true,
      label: 'First name',
      type: 'string'
    },
    lastName: {
      required: true,
      label: 'Last name',
      type: 'string'
    },
    email: {
      label: 'Email',
      required: true,
      type: 'email'
    },
    password: {
      required: true,
      label: 'Password',
      type: function (val) {
        if (val.length >= 5) return false;
        return 'Password must be at least 5 characters. Please try again';
      },
    },
    birthdayMonth: {
      required: true
    },
    birthdayDay: {
      required: true
    },
    birthdayYear: {
      required: true
    },
    mailingList: {
      type: 'boolean'
    }
  },
  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },
  render: function () {
    return (<div className="airbnb-eg">
      <form>
        <Input label="First name" field="firstName" />
        <Input label="Last name" field="lastName" />
        <Input label="Email" field="email" />
        <Input label="Password" field="password" type="password" />

        <label>Birthday</label>
        <div className="helper-error" hidden={!this.didSubmit() || (!this.validateField('birthdayMonth') && !this.validateField('birthdayDay') && !this.validateField('birthdayYear'))}>
          Select your birth date to continue
        </div>
        <select valueLink={this.linkField('birthdayMonth')}>
          <option value="">Month</option>
          {dateData.months.map(month => <option value={month}>{month}</option>)}
        </select>
        <select valueLink={this.linkField('birthdayDay')}>
          <option value="">Day</option>
          {dateData.days.map(day => <option value={day}>{day}</option>)}
        </select>
        <select valueLink={this.linkField('birthdayYear')}>
          <option value="">Year</option>
          {dateData.years.map(year => <option value={year}>{year}</option>)}
        </select>
        <label className="checkbox">
          <input type="checkbox" checkedLink={this.linkField('mailingList')} />
          I'd like to receive coupons and inspiration
        </label>
        <p className="terms">By signing up, I agree to Airbnb's Terms of Service, Privacy Policy, Guest Refund Policy, and Host Guarantee Terms.</p>
        <div className="submit-footer">
          <SubmitButton>Sign up</SubmitButton>
        </div>
      </form>
    </div>);
  }
});

module.exports = Form;
