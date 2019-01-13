'use strict';

// DROP TABLE books;

// CREATE TABLE IF NOT EXISTS bookshelves (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255)
// );

// CREATE TABLE IF NOT EXISTS books (
//   id SERIAL PRIMARY KEY,
//   title VARCHAR(255),
//   author VARCHAR(255),
//   isbn VARCHAR(255),
//   image_url VARCHAR(255),
//   description TEXT,
//   bookshelf_id INT REFERENCES bookshelves(id)
// );
const bookshelf = require('../bookshelf/bookshelf-schema.js');
const mongoose = require('mongoose');
require('mongoose-schema-jsonSchema')(mongoose);

const books = mongoose.Schema({
// building data model
  title: { type: String, required: true},
  author: { type: String, required: true},
  isbn: { type:String, required: false},
  image_url: { type: String, required: false},
  description: { type: String, required: false},

},{ toObject: { virtuals:true }, toJSON: { virtuals:true }} );

books.virtual('bookshelf_id', {
  ref: 'bookshelf',
  localField:'bookshelf_id',
  foreignField: 'id',
  justOne: false,
});

books.pre('find', function() {
  try {
    this.populate('books');
  }
  catch(e) {
    console.error('Find Error', e); 
  }
});

module.exports = mongoose.model('books', books);