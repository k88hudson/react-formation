var React = require('react');
var {CreateForm, SubmitButton} = require('../../../src/form');

var Form = CreateForm({

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
    }
  },

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

      <p><SubmitButton /></p>
      <p><button onClick={this.submitForm}>This will also submit</button></p>

    </form>);
  }
});

module.exports = Form;

