'use strict';

const schema = require('./books-schema');
const Model = require('../model');


class Book extends Model {}


module.exports = new Book(schema);