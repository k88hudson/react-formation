var should = require('should');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Formation = require('../src/form');

function mockForm(config) {
  var Form = Formation.CreateForm(config || {
    getSchema: function () {
      return {
        foo: {required: true},
        bar: {required: true}
      };
    },
    onSuccess: function () {},
    render: function () {
      return <form />;
    }
  });
  return TestUtils.renderIntoDocument(<Form />);
}

describe('global errors', function () {

  var form;

  describe('#setGlobalError', function () {
    beforeEach(function () {
      form = mockForm();
    });

    it('should set a non-field-related global error', function () {
      form.setGlobalError('CONNECT_ERROR', 'Foo bar baz');
      should.deepEqual(form.state.__globalErrors.CONNECT_ERROR, ['Foo bar baz']);
    });

    it('should throw if error is not a string or an array', function () {
      should.throws(() => {
        form.setGlobalError('foo', {message: 'error'});
      }, (err) => {
        return err.message === 'Second argument must be a string on an array of strings';
      });
    });

    it('should set an error that is a string', function () {
      form.setGlobalError('foo', 'Foo is not valid');
      should.deepEqual(form.state.__globalErrors.foo, ['Foo is not valid']);
    });

    it('should set an array of errors', function () {
      form.setGlobalError('foo', ['Foo is not valid', 'Boo']);
      should.deepEqual(form.state.__globalErrors.foo, ['Foo is not valid', 'Boo']);
    });

    it('should override existing errors', function () {
      form.setGlobalError('foo', ['Foo is not valid']);
      form.setGlobalError('foo', ['Boo']);
      should.deepEqual(form.state.__globalErrors.foo, ['Boo']);
    });

  });

  describe('#getGlobalErrors', function () {
    beforeEach(function () {
      form = mockForm();
    });

    it('should return an empty array by default', function () {
      should.deepEqual(form.getGlobalErrors(), {});
    });

    it('should return all global errors by field', function () {
      form.setGlobalError('foo', 'Foo is not valid');
      form.setGlobalError('bar', 'Bar is not valid');
      should.deepEqual(form.getGlobalErrors(), {foo: ['Foo is not valid'], bar: ['Bar is not valid']});
    });

  });

  describe('global error behaviour', function () {
    beforeEach(function () {
      form = mockForm();
    });

    it('should clear field-related errors when field values update', function () {
      form.setGlobalError('foo', 'Foo is not valid');
      form.setGlobalError('bar', 'Bar');
      should.deepEqual(form.state.__globalErrors, {foo: ['Foo is not valid'], bar: ['Bar']});
      form.setState({foo: 'bar'});
      should.deepEqual(form.state.__globalErrors, {bar: ['Bar']});
    });

    it('should add global errors to result of valdiateField', function () {
      form.setGlobalError('foo', 'Foo is not valid');
      should.deepEqual(form.getErrors('foo'), ['foo is required', 'Foo is not valid']);
    });

    it('should prevent form submission if fields with global errors are not updated', function () {
      var f = mockForm({
        getSchema: function () {
          return {foo: {required: false}};
        },
        onSuccess: function () {
          throw new Error('Submitted form');
        },
        render: function () {
          return <form />;
        }
      });
      f.setGlobalError('foo', 'Foo is not valid');
      f.setGlobalError('OTHER', 'Other error');
      f.submitForm();
    });

    it('should clear all global errors after a successful submit', function () {
      form.setGlobalError('foo', 'Foo is not valid');
      form.setGlobalError('OTHER', 'Other error');
      form.setState({'foo': 'fofofofofo', bar: 'barbarbar'});
      form.submitForm();
      should.deepEqual(form.state.__globalErrors, {});
    });
  });

});
