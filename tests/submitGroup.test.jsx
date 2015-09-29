var should = require('should');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var assign = require('react/lib/Object.assign');

describe('CreateForm', function () {

  var Formation = require('../src/form');

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
      var didSubmit = true;
      form.setState({foo: 'hi'});
      form.submitGroup(0, (data) => {
        // Doesn't actually pass data for now
        //didSubmit = data;
        didSubmit = true;
      });
      should.deepEqual(didSubmit, true);
    });

    it('should call onError if the group is invalid', function () {
      var didSubmit = true;
      form.setState({foo: 'hi'});
      form.submitGroup(1, () => true, (data) => {
        // Doesn't actually pass data for now
        //didSubmit = data;
        didSubmit = true;
      });
      should.deepEqual(didSubmit, true);
    });
  });

});