var React = require('react');
var RevealData = require('./reveal-data.jsx');

var ContactCard = React.createClass({
  render: function () {
    return (<div>

      <div className="contact-card">
        <p><label>Name</label> {this.props.name}</p>
        <p><label>Bio</label> {this.props.bio}</p>
        <p><label>Age</label> {this.props.age}</p>
      </div>

      <RevealData name="ContactCard" props={this.props} state={this.state} />

    </div>);
  }
});

module.exports = ContactCard;
