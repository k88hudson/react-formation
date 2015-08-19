var React = require('react/addons');
var {CreateForm, SubmitButton, ErrorMessage, FormMixin} = require('./form.jsx');

var CreditCard = React.createClass({
  render: function () {
    return (<div className="form-group">
      <label>Enter your credit card number:</label>
      <input name="cardNumber" />
    </div>);
  }
});

var PersonalInfo = React.createClass({
  render: function () {
    return (<div>
      <div className="form-group">
        <label>Name</label>
        <input name="name"/>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input name="email"/>
      </div>
    </div>);
  }
});

var Form = React.createClass({
  render: function () {
    return (<form>
      <CreditCard />
      <PersonalInfo />
      <button>Submit</button>
    </form>);
  }
});

React.render(<Form />, document.getElementById('app'));

