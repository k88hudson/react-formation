var React = require('react');
var Formation = require('../../../src/form');

var CreateForm = Formation.CreateForm;
var ErrorMessage = Formation.ErrorMessage;

var Form = CreateForm({

  getSchema: function () {
    return {
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
    };
  },

  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },

  render: function () {
    return (<form>

      <div className="form-group">
        <label>Name (error is shown after submit attempt)</label>
        <input type="text" name="name" valueLink={this.linkField('name')} />
        <ErrorMessage field="name" />
      </div>

      <div className="form-group">
        <label>Email (error is shown immediately)</label>
        <input type="text" name="email" valueLink={this.linkField('email')} />
        <ErrorMessage show={true} field="email" />
      </div>

      <p><button onClick={this.submitForm}>Submit</button></p>

    </form>);
  }
});

module.exports = Form;

