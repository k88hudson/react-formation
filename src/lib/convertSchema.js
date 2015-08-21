module.exports = function convertSchema(schema) {
  var newSchema = {};

  schema.forEach((group, i) => {
    Object.keys(group).forEach(key => {
      group[key].group = i;
      newSchema[key] = group[key];
    });
  });

  return newSchema;
};

