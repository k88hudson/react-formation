var should = require('should');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var assign = require('react/lib/Object.assign');

describe('CreateForm', function () {

  var Formation = require('../src/form');

  describe('api', function () {
    var contextConfig = require('../src/lib/contextConfig');
    var CreateFormMixin = require('../src/lib/CreateFormMixin');
    contextConfig.methods.forEach(method => {
      it('should have method #' + method, function () {
        should.equal(typeof CreateFormMixin[method], 'function');
      });
    });
  });

  describe('getSchema', function () {
    var form;
    var didSubmit;

    var foo = 'john@doe.com';
    var bar = 10;

    beforeEach(function () {
      var Form = Formation.CreateForm({
        getSchema: function () {
          return {
            foo: {required: true, validations: 'email', initial: this.props.foo},
            bar: {required: true, validations: 'number', initial: this.props.bar}
          };
        },
        onSuccess: function () {},
        render: function () {
          return <form />;
        }
      });
      form = TestUtils.renderIntoDocument(<Form foo={foo} bar={bar} />);
    });

    it('should create instance property __schema correctly', function () {
      should.equal(form.__schema.foo.required, true);
      should.equal(form.__schema.foo.initial, foo);
      should.equal(form.__schema.foo.validations, 'email');
      should.equal(form.__schema.bar.required, true);
      should.equal(form.__schema.bar.initial, bar);
      should.equal(form.__schema.bar.validations, 'number');
    });

    it('should set initial state correctly', function () {
      should.equal(form.state.foo, foo);
      should.equal(form.state.bar, bar);
    });
  });

  describe('#getValues', function () {
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
    var form = TestUtils.renderIntoDocument(<Form  />);

    it('should get all current values that are not undefined', function () {
      form.setState({foo: 'foo'});
      var currentValues = form.getValues();
      should.deepEqual(currentValues, {foo: 'foo'});
    });

  });

});
