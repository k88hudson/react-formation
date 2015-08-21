module.exports = function convertSchema(schema) {
  var newSchema = {};

  schema.forEach((group, i) => {
    Object.keys(group).forEach(key => {
      group[key].group = i;
      if (newSchema[key]) throw new Error('Your schema has two groups with the same field: ' + key);
      newSchema[key] = group[key];
    });
  });

  return newSchema;
};

