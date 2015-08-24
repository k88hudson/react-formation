var React = require('react');
var ComposableForm = require('../../src/form');

var CreateForm = ComposableForm.CreateForm;
var ErrorMessage = ComposableForm.ErrorMessage;

var Input = require('../../src/lib/components/Input');

var PersonalInfo = CreateForm({

  schema: {
    name: {
      label: 'Name',
      type: 'string',
      required: true
    },
    email: {
      label: 'Email',
      type: 'email',
      required: true
    }
  },

  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },

  render: function () {

    var inputs = [
      <Input label="Name" field="name" />,
      <Input label="Email" field="email" />
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

