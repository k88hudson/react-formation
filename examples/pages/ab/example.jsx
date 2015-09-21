var React = require('react');
var Formation = require('../../../src/form');

var CreateForm = Formation.CreateForm;
var ErrorMessage = Formation.ErrorMessage;

var PersonalInfo = CreateForm({

  getSchema: function () {
    return {
      name: {
        label: 'Name',
        validations: 'string',
        required: true
      },
      email: {
        label: 'Email',
        validations: 'email',
        required: true
      }
    }
  },

  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },

  render: function () {

    var inputs = [
      <div className="form-group">
        <label>Name</label>
        <input validations="text" name="name" valueLink={this.linkField('name')} />
        <ErrorMessage field="name" />
      </div>,

      <div className="form-group">
        <label>Email</label>
        <input validations="text" name="email" valueLink={this.linkField('email')} />
        <ErrorMessage field="email" />
      </div>
    ];

    if (this.props.emailFirst) inputs.reverse();

    var style = {
      padding: 20,
      backgroundColor: this.props.backgroundColor
    };

    return (<form style={style}>
      {inputs}
      <p><button onClick={this.submitForm}>Submit</button></p>
    </form>);
  }
});


var Form = React.createClass({
  render: function () {
    return (<div>
      <h3>White background</h3>
      <PersonalInfo />

      <h3>Yellow background, email first</h3>
      <PersonalInfo emailFirst backgroundColor="#FFEEBC" />
    </div>);
  }
});

module.exports = Form;

