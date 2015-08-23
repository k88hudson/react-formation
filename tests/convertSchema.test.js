var should = require('should');

describe('convertSchema', function () {
  var convertSchema = require('../src/lib/convertSchema');
  it('should convert an array of groups to a flat schema and add a group property', function () {
    var schema = [
      {foo: {required: true}},
      {bar: {required: true},
       baz: {required: true}}
    ];
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
