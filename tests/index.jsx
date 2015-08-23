var should = require('should');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var assign = require('react/lib/Object.assign');

var ComposableForm = require('../src/form');

function createValidSchema () {
  return {
    foo: {required: true},
    bar: {required: true}
  };
}

function createValidMultiSchema () {
  return [
    {foo: {required: true}},
    {bar: {required: true},
     baz: {required: true}}
  ];
}

function mockMixin () {
  return {
    didSubmit: () => {},
    validateField: () => {}
  };
};

// Make console.warn throw
var warn = console.warn;
console.warn = function (warning) {
  throw new Error(warning);
  warn.apply(console, arguments);
};


describe('CreateForm', function () {

  describe('api', function () {
    var contextConfig = require('../src/lib/contextConfig');
    var createFormMixin = require('../src/lib/createFormMixin');
    contextConfig.methods.forEach(method => {
      it('should have method #' + method, function () {
        should.equal(typeof createFormMixin[method], 'function');
      });
    });
  });

  describe('#linkField', function () {
    var form;

    beforeEach(function () {
      var Form = ComposableForm.CreateForm({
        schema: createValidSchema(),
        onSuccess: function () {},
        render: function () {
          return <form />;
        }
      });
      form = TestUtils.renderIntoDocument(<Form  />);
    });

    it('should return a ReactLink', function () {
      var link = form.linkField('foo');
      should.equal(link.constructor.name, 'ReactLink');
    });

    it('should throw if field is not in the schema', function () {
      should.throws(() => {
        form.linkField('blah');
      });
      should.throws(() => {
        form.linkField();
      });
    });

  });

  describe('#getValues', function () {
    var Form = ComposableForm.CreateForm({
      schema: createValidSchema(),
      onSuccess: function () {},
      render: function () {
        return <form />;
      }
    });
    var form = TestUtils.renderIntoDocument(<Form  />);

    it('should get all current values that are not undefined', function () {
      form.setState({foo: 'foo'});
      var currentValues = form.getValues();
      should.deepEqual(currentValues, {foo: 'foo'});
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

describe('ErrorMessage', function () {
  var Injector = require('inject?./FormMixin!../src/lib/ErrorMessage');

  function CreateErrorMessage(customProps) {
    return Injector({'./FormMixin': assign(mockMixin(), customProps || {})});
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

describe('validations', function () {
  var validations = require('../src/lib/validations');

  function check(type, valid, invalid) {
    valid.forEach(value => {
      it('should return false for ' + value, function () {
        should.equal(validations[type](value), false);
      });
    });
    invalid.forEach(value => {
      it('should return an error for ' + value, function () {
        should.ok(typeof validations[type](value) === 'string');
      });
    });
  }

  describe('number', function () {
    check('number', [42, '42'], ['1.323', 'hello']);
  });

  describe('email', function () {
    check('email',
      ['hello@world.com', 'googl_Ded123ad@gmail.biz'],
      ['asdasd', 'asds@dasda', 'adsasdd.com']);
  });

});
