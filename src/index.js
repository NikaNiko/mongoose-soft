const assign = require('lodash.assign');

module.exports = function () {
  return function (schema) {
    schema.add({ deleted: { type: Boolean } });
    schema.statics.remove = remove;
    schema.pre('find', softDeleteConditions);
    schema.pre('findOne', softDeleteConditions);
    schema.pre('update', softDeleteConditions);
    schema.pre('findOneAndRemove', softDeleteConditions);
    schema.pre('findOneAndUpdate', softDeleteConditions);
  };
};

function softDeleteConditions() {
  this._conditions = assign({ deleted: { $in: [false, null] } }, this._conditions);
}

function remove(query) {
  return this.update(query, { deleted: true });
}
