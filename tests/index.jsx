// React needs a polyfill!
require('phantomjs-polyfill');

var should = require('should');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

function createValidMultiSchema () {
  return [
    {foo: {required: true}},
    {bar: {required: true},
     baz: {required: true}}
  ];
}

describe('CreateForm', function () {

  describe('api', function () {
    var contextConfig = require('../src/lib/contextConfig');
    var createFormMixin = require('../src/lib/createFormMixin.jsx');
    contextConfig.methods.forEach(method => {
      it('should have method #' + method, function () {
        should.equal(typeof createFormMixin[method], 'function');
      });
    });
  });

});

describe('convertSchema', function () {
  var convertSchema = require('../src/lib/convertSchema');
  it('should convert an array of groups to a flat schema and add a group property', function () {
    var schema = createValidMultiSchema();
    var result = convertSchema(schema);
    should.deepEqual(result, {
      foo: {required: true, group: 0},
      bar: {required: true, group: 1},
      baz: {required: true, group: 1}
    });
  });
  it('should throw if two groups have the same field name', function () {
    var schema = [
      {foo: {required: true}},
      {foo: {required: true},
       baz: {required: true}}
    ];
    should.throws(() => convertSchema(schema), function (err) {
      return err.message === 'Your schema has two groups with the same field: foo';
    }, 'Unexpected error');
  });
});

var Injector = require('inject?./FormMixin!../src/lib/ErrorMessage.jsx');
var ErrorMessage = Injector({
  'react': 'react',
  './FormMixin': {
    didSubmit: () => {},
    validateField: () => {}
  }
});

describe('ErrorMessage', function () {
  var Injector = require('inject?./FormMixin!../src/lib/ErrorMessage.jsx');
  var ErrorMessage = Injector({
    'react': 'react',
    './FormMixin': {
      didSubmit: () => {},
      validateField: () => {}
    }
  });

  it('should retain arbitrary props', function () {
    var testError = TestUtils.renderIntoDocument(<ErrorMessage className="foo" />);
    var el = testError.getDOMNode();
    should.equal(el.className, 'foo');
  });

});
