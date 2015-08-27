var React = require('react');
var Formation = require('../../src/form');

var CreateForm = Formation.CreateForm;
var ErrorMessage = Formation.ErrorMessage;
var Radio = Formation.Radio;

var Form = CreateForm({

  schema: {
    name: {
      label: 'Name',
      type: 'string',
      required: true
    },
    color: {
      label: 'Favourite Color',
      type: 'string',
      required: true
    }
  },

  onSuccess: function (data) {
    alert(JSON.stringify(data));
  },

  render: function () {
    var colorLink = this.linkField('color');
    return (<form>

      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" valueLink={this.linkField('name')} />
        <ErrorMessage field="name" />
      </div>

      <div className="form-group">
        <label>What is your favourite colour?</label>
        <p><Radio name="color" value="blue" radioLink={colorLink} /> Blue</p>
        <p><Radio name="color" value="red" radioLink={colorLink} /> Red</p>
        <p><Radio name="color" value="green" radioLink={colorLink} /> Green</p>
      </div>

      <p><button onClick={this.submitForm}>Submit</button></p>

    </form>);
  }
});

module.exports = Form;

