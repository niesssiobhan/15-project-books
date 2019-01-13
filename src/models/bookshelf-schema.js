'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const bookshelf = mongoose.Schema({
  id: { type: String},
  name: { type: String, required: true },
});


module.exports = mongoose.model('bookshelf', bookshelf);