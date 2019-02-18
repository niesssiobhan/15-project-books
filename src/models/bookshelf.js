'use strict';

const schema = require('../models/books-schema');
const Model = require('./model');

/**
 *
 *
 * @class BookShelf
 * @extends {Model}
 */
class BookShelf extends Model {}

module.exports = new BookShelf(schema);