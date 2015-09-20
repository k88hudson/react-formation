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

  describe('#linkField', function () {
    var form;

    beforeEach(function () {
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

  describe('#submitGroup', function () {
    var form;

    beforeEach(function () {
      var Form = Formation.CreateForm({
        getSchema: function () {
          return {
            foo: {required: true, group: 0},
            bar: {required: true, group: 1},
            baz: {required: true, group: 1}
          };
        },
        onSuccess: function () {},
        render: function () {
          return <form />;
        }
      });
      form = TestUtils.renderIntoDocument(<Form  />);
    });

    it('should make all fields dirty in a group', function () {
      form.submitGroup(1);
      should.deepEqual(form.state.__dirtyFields, {foo: false, bar: true, baz: true});
    });

    it('should call onSuccess if the group is valid', function () {
      var didSubmit = false;
      form.setState({foo: 'hi'});
      form.submitGroup(0, (data) => {
        // Doesn't actually pass data for now
        //didSubmit = data;
        didSubmit = true;
      });
      should.deepEqual(didSubmit, true);
    });

    it('should call onError if the group is invalid', function () {
      var didSubmit = false;
      form.setState({foo: 'hi'});
      form.submitGroup(1, () => true, (data) => {
        // Doesn't actually pass data for now
        //didSubmit = data;
        didSubmit = true;
      });
      should.deepEqual(didSubmit, true);
    });
  });

  describe('#submitForm', function () {
    var form;
    var didSubmit;

    beforeEach(function () {
      didSubmit = false;
      var Form = Formation.CreateForm({
        getSchema: function () {
          return {
            foo: {required: true, group: 0},
            bar: {required: true, group: 1},
            baz: {required: true, validations: 'email', group: 1},
            qux: {validations: 'number', group: 1}
          };
        },
        onSuccess: function (data) {
          didSubmit = data;
        },
        render: function () {
          return <form />;
        }
      });
      form = TestUtils.renderIntoDocument(<Form  />);
    });

    it('should call preventDefault on an error', function () {
      var didPrevent = false;
      var e = {preventDefault: () => didPrevent = true};
      form.submitForm(e);
      should.ok(didPrevent);
    });

    it('should make all fields dirty', function () {
      form.submitForm();
      should.deepEqual(form.state.__dirtyFields, {foo: true, bar: true, baz: true, qux: true});
    });

    it('should make this.state.__didSubmit true', function () {
      form.submitForm();
      should.equal(form.state.__didSubmit, true);
    });

    it('should not call onSuccess if the form is invalid', function () {
      form.submitForm();
      should.equal(didSubmit, false);
    });

    it('should call onSuccess if form is valid, skipping undefined values', function () {
      form.setState({foo: 'hi', bar: 'whatup', baz: 'f@ff.com'});
      form.submitForm();
      should.deepEqual(didSubmit, {foo: 'hi', bar: 'whatup', baz: 'f@ff.com'});
    });

  });

  describe('#validateField', function () {
    var form;
    beforeEach(function () {
      var Form = Formation.CreateForm({
        getSchema: function () {
          return {
            foo: {label: 'Foo', required: true},
            bar : {validations: function (val) {
              if (val > this.state.max) return false;
              return 'Must be greater than ' + this.state.max;
            }},
            fizz: {type: 'email'},
            email: {required: true, validations: 'email'},
            name: {validations: Formation.Validator.maxLength(10)},
            lastName: {required: function () {
              return this.state.name;
            }},
            apples: {validations: Formation.Validator.min(10), messages: {min: 'Too few apples'}}
          };
        },
        onSuccess: function () {},
        render: function () {
          return <form />;
        }
      });
      form = TestUtils.renderIntoDocument(<Form  />);
    });

    it('should return an error if value is falsey and required', function () {
      should.deepEqual(form.validateField('foo'), ['Foo is required']);
    });

    it('should evaluate a conditional required function in the right contextConfig', function () {
      should.equal(form.validateField('lastName'), false);
      form.setState({name: 'Kate'});
      should.deepEqual(form.validateField('lastName'), ['lastName is required']);
    });
    it('should validate built in validators in the right context', function () {
      form.setState({name: 'Kate'});
      should.deepEqual(form.validateField('name'), false);
      form.setState({name: 'Kateasdasdsadasdasdasdasd'});
      should.deepEqual(form.validateField('name'), ['Must be less than 10 characters']);
    });
    it('should return a validation error for string', function () {
      should.deepEqual(form.validateField('email'), ['email is required']);
      form.setState({email: 'hello'});
      should.deepEqual(form.validateField('email'), ['Must be an email']);
    });
    it('should return a validation error for a custom validation with the right context', function () {
      form.setState({bar: 4, max: 10});
      should.deepEqual(form.validateField('bar'), ['Must be greater than 10']);
      form.setState({bar: 11});
      should.deepEqual(form.validateField('bar'), false);
    });
    it('should return false for valid values', function () {
      form.setState({email: 'kate@fff.com'});
      should.equal(form.validateField('email'), false);
      should.equal(form.validateField('name'), false);
    });

    it('should warn to use validations instead of type in schema', function () {
      var warn = console.warn;
      var didWarn;
      console.warn = function () {
        didWarn = true;
      };

      form.validateField('fizz');
      should.equal(didWarn, true);

      console.warn = warn;
    });
    it('should use custom validation errors', function () {
      form.setState({apples: 4});
      should.deepEqual(form.validateField('apples'), ['Too few apples']);
    });
  });

  describe('#didSubmit', function () {
    var form;

    beforeEach(function () {
      var Form = Formation.CreateForm({
        getSchema: function () {
          return {
            foo: {required: true, group: 0},
            baz: {group: 1}
          };
        },
        onSuccess: function () {},
        render: function () {
          return <form />;
        }
      });
      form = TestUtils.renderIntoDocument(<Form  />);
    });

    it('should return this.state.__didSubmit', function () {
      should.equal(form.didSubmit(), false);
      form.submitForm();
      should.equal(form.didSubmit(), true);
    });

    it('should return submit state for a particular field when provided', function () {
      should.equal(form.didSubmit('baz'), false);
      form.submitGroup(1);
      should.equal(form.didSubmit('foo'), false);
      should.equal(form.didSubmit('baz'), true);
      form.submitForm();
      should.equal(form.didSubmit('foo'), true);
    });

  });

  describe('#isGroupValid', function () {
    //TODO
  });

  describe('#isValid', function () {
    //TODO
  });

});
