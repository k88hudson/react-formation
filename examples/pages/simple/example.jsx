var React = require('react');
var CreateForm = require('../../../src/form').CreateForm;

var Form = CreateForm({

  // This defines all the fields in the form
  getSchema: function () {
    return {
      name: {
        label: 'Name',
        validations: 'string'
      },
      email: {
        label: 'Email',
        validations: 'string'
      }
    };
  },

  // This code is run when the form is valid and submitted
  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },

  render: function () {
    return (<form>

      <div className="form-group">
        <label>Name</label>
        <input validations="text" valueLink={this.linkField('name')} />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input validations="text" valueLink={this.linkField('email')} />
      </div>

      <div className="form-group">
        <button onClick={this.submitForm}>Submit</button>
      </div>

    </form>);
  }
});

module.exports = Form;

