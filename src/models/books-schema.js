'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonSchema')(mongoose);

const books = mongoose.Schema({
// building data model
});

module.exports = mongoose.model('books', books);