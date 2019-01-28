'use strict';

/**
 *
 *
 * @class Model
 */
class Model {
  /**
   *Creates an instance of Model.
   * @param {sring} schema mongo
   * @memberof Model
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   *
   * Function retrieves one or more records
   * @param {string} _id mongo record id
   * @returns 
   * @memberof Model
   */
  get(_id) {
    let queryObject = _id ? {_id} : {};
    return this.schema.find(queryObject);
  }

  /**
   *
   * Function replaces a record in the database
   * @param {object} record
   * @returns
   * @memberof Model
   */
  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  /**
   *
   * Function updates a record in the database
   * @param {string} _id mongo record id
   * @param {object} record record dats to replace
   * @returns
   * @memberof Model
   */
  put(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, {new:true});
  }

  /**
   *
   * Function deletes a record in the database
   * @param {string} _id mongo record id
   * @return
   * @memberof Model
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }

}

module.exports = Model;