var React = require('react/addons');

var contextTypes = {
  activePage: React.PropTypes.number,
  navigateTo: React.PropTypes.func,
  goNext: React.PropTypes.func
};

var NavButton = React.createClass({
  render: function () {
    return (<a className={'sbs-nav-btn' + (this.props.active ? ' active' : '')} onClick={this.props.onClick}>
      <span className="sbs-nav-btn-index">{this.props.index + 1}</span>
      <span className="sbs-nav-btn-title">{this.props.title}</span>
    </a>);
  }
});

var StepMixin = {
  contextTypes,
  activePage: function () {
    return this.context.activePage;
  },
  navigateTo: function (i) {
    this.context.navigateTo(i);
  },
  goNext: function () {
    this.context.goNext();
  }
};

var StepByStep = React.createClass({
  childContextTypes: contextTypes,
  getChildContext: function() {
    return {
      activePage: this.state.activePage,
      navigateTo: this.navigateTo,
      goNext: this.goNext
    };
  },
  getInitialState: function () {
    return {
      activePage: 0
    };
  },
  navigateTo: function (i) {
    this.setState({activePage: i});
  },
  goNext: function () {
    this.setState({activePage: this.state.activePage + 1});
  },
  render: function () {
    return (<div className="step-by-step">
      <div className="sbs-nav">
        {this.props.children.map((page, i) => <NavButton active={i === this.state.activePage} index={i} title={page.props.title} onClick={this.props.interactiveNav ? () => this.navigateTo(i) : null} />)}
      </div>
      {this.props.children.map((page, i) => {
        return (<div hidden={i !== this.state.activePage}>
          {React.addons.cloneWithProps(page)}
        </div>);
      })}
    </div>);
  }
});

var NextButton = React.createClass({
  mixins: [StepMixin],
  onClick: function (e) {
    e.preventDefault();
    if (this.props.disabled) return;
    this.goNext();
  },
  render: function () {
    return (<button onClick={this.onClick} disabled={this.props.disabled}>
      {this.props.children || 'Next'}
    </button>);
  }
});

module.exports = {
  StepByStep,
  StepMixin,
  NextButton
};
