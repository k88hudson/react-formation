var should = require('should');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var assign = require('react/lib/Object.assign');

describe('CreateForm', function () {

  var ComposableForm = require('../src/form');

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
        schema: {
          foo: {required: true},
          bar: {required: true}
        },
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
      schema: {
        foo: {required: true},
        bar: {required: true}
      },
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
