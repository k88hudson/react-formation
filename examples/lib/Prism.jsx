// Mostly from
// https://github.com/tomchentw/react-prism/blob/master/src/PrismCode.js
//

var React = require('react/addons');

var PrismCode = React.createClass({

  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    async: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      async: true,
    };
  },

  componentDidMount () {
    this._hightlight();
  },

  componentDidUpdate (prevProps) {
    if (this.props !== prevProps) {
      this._hightlight();
    }
  },

  _hightlight () {
    Prism.highlightElement(this.refs.code.getDOMNode(), this.props.async);
  },

  render () {
    var {props, state} = this;
    return (
      <pre ref="code" data-line={this.props.line} className={props.className}>{props.children}</pre>
    );
  },
});

module.exports = PrismCode;
