var should = require('should');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var assign = require('react/lib/Object.assign');

describe('CreateForm', function () {

  var Formation = require('../src/form');

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

});