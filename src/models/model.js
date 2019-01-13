'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  get() {
    let queryObject = _id ? {_id} : {};
    return this.schema.find(queryObject);
  }

  post() {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  put() {
    return this.schema.findByIdAndUpdate(_id, record, {new:true});
  }

  delete() {
    return this.schema.findByIdAndDelete(_id);
  }

}

module.exports = Model;