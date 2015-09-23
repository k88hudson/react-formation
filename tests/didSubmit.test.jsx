var should = require('should');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var assign = require('react/lib/Object.assign');

describe('CreateForm', function () {

  var Formation = require('../src/form');

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

});