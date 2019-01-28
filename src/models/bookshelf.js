'use strict';

const schema = require('../books/books-schema');
const Model = require('./model');

/**
 *
 *
 * @class BookShelf
 * @extends {Model}
 */
class BookShelf extends Model {}

module.exports = new BookShelf(schema);