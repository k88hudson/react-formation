var should = require('should');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var assign = require('react/lib/Object.assign');

// This depends on a commit not landed in the original dependency,
// https://github.com/nkbt/istanbul-instrumenter-loader/commit/42631c8495840a5a28842ef91b6feaa591d36cf0
// See https://github.com/deepsweet/istanbul-instrumenter-loader/pull/12 for PR in progress

describe('ErrorMessage', function () {
  var Injector = require('inject?./FormMixin!../src/lib/ErrorMessage');

  function CreateErrorMessage(customProps) {
    return Injector({'./FormMixin': assign({
      didSubmit: () => {},
      validateField: () => {}
    }, customProps || {})});
  }

  it('should require a field prop', function () {
    var ErrorMessage = CreateErrorMessage();
    should.throws(() => {
      TestUtils.renderIntoDocument(<ErrorMessage />);
    });

  });

  it('should retain arbitrary props', function () {
    var ErrorMessage = CreateErrorMessage();
    var testError = TestUtils.renderIntoDocument(<ErrorMessage field="foo" className="foo" />);
    var el = testError.getDOMNode();
    should.equal(el.className, 'foo');
  });

  describe('hide/show', function () {
    it('should be hidden if there are no errors', function () {
      var ErrorMessage = CreateErrorMessage({
        didSubmit: () => true
      });
      var testError = TestUtils.renderIntoDocument(<ErrorMessage field="foo" />);
      var el = testError.getDOMNode();
      should.equal(el.hidden, true);
    });

    it('should be hidden if the field was never submitted', function () {
      var ErrorMessage = CreateErrorMessage({
        didSubmit: () => false,
        validateField: () => ['Has an error']
      });
      var testError = TestUtils.renderIntoDocument(<ErrorMessage field="foo" />);
      var el = testError.getDOMNode();
      should.equal(el.hidden, true);
    });

    it('should be shown if there was an error and the form was submitted', function () {
      var ErrorMessage = CreateErrorMessage({
        didSubmit: () => true,
        validateField: () => ['Has an error']
      });
      var testError = TestUtils.renderIntoDocument(<ErrorMessage field="foo" />);
      var el = testError.getDOMNode();
      should.equal(el.hidden, false);
    });

    it('should be shown if there is an error and the show prop is true', function () {
      var ErrorMessage = CreateErrorMessage({
        didSubmit: () => false,
        validateField: () => ['Has an error']
      });
      var testError = TestUtils.renderIntoDocument(<ErrorMessage show={true} field="foo" />);
      var el = testError.getDOMNode();
      should.equal(el.hidden, false);
    });
  });

  describe('error message', function () {
    it('should show the error text', function () {
      var ErrorMessage = CreateErrorMessage({
        validateField: () => ['Has an error']
      });
      var testError = TestUtils.renderIntoDocument(<ErrorMessage field="foo" className="foo" />);
      var el = testError.getDOMNode();
      should.equal(el.querySelector('span').innerHTML, 'Has an error');
    });
  });

});
