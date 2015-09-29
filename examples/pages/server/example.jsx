var React = require('react');
var {CreateForm, Validator} = require('../../../src/form');

var Form = CreateForm({

  // This defines all the fields in the form
  getSchema: function () {
    return {
      username: {
        label: 'Username',
        validations: Validator.maxLength(100)
      },
      email: {
        label: 'Email',
        validations: Validator.email()
      }
    };
  },

  // This code is run when the form is valid and submitted
  onSuccess: function (data) {
    api(data, (response) => {
      if (response.error === 'USERNAME_TAKEN') {
        this.setGlobalError('username', 'Sorry, that username was taken');
      }
    });
  },

  render: function () {
    return (<form>

      <div className="form-group">
        <label>Username</label>
        <input type="text" valueLink={this.linkField('username')} />
        {this.getGlobalErrors().username}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="text" valueLink={this.linkField('email')} />
      </div>

      <div className="form-group">
        <button onClick={this.submitForm}>Submit</button>
      </div>

    </form>);
  }
});

module.exports = Form;

function api(data, cb) {
  if (data.username === 'kate') {
    cb({
      status: 400,
      error: 'USERNAME_TAKEN'
    })
  } else {
    cb({status: 200});
  }
}

