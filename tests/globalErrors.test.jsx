var should = require('should');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Formation = require('../src/form');

function mockForm() {
  var Form = Formation.CreateForm({
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

    it('should throw if you try to set a non-existent field', function () {
      should.throws(() => {
        form.setGlobalError('baz', 'Foo bar baz');
      }, (err) => {
        return err.message === 'Cannot set global error for non-existent field baz';
      });
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

});
