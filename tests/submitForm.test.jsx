var should = require('should');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var assign = require('react/lib/Object.assign');

describe('CreateForm', function () {

  var Formation = require('../src/form');

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

});