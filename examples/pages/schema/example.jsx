var React = require('react');
var CreateForm = require('../../../src/form').CreateForm;

var Form = CreateForm({

  // This defines all the fields in the form
  getSchema: function () {
    return {
      name: {
        label: 'Name',
        type: 'string'
      },
      email: {
        label: 'Email',
        type: 'string'
      }
    };
  },

  // This code is run when the form is valid and submitted
  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },

  render: function () {
    return (<form>

      <p>
        <label>Name</label>
        <input type="text" valueLink={this.linkField('name')} />
      </p>

      <p>
        <label>Email</label>
        <input type="text" valueLink={this.linkField('email')} />
      </p>

      <p><button onClick={this.submitForm}>Submit</button></p>

    </form>);
  }
});

module.exports = Form;

