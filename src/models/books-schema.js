'use strict';

const bookshelf = require('./bookshelf-schema.js');
const mongoose = require('mongoose');

const books = mongoose.Schema({
// building data model
  title: { type: String, required: true},
  author: { type: String, required: true},
  isbn: { type:String, required: false},
  image_url: { type: String, required: false},
  description: { type: String, required: false},

},{ toObject: { virtuals:true }, toJSON: { virtuals:true }} );

books.virtual('bookshelf', {
  ref: 'bookshelves',
  localField:'bookshelf_id',
  foreignField: '_id',
  justOne: true,
});

books.pre('find', function() {
  try {
    this.populate('bookshelf');
  }
  catch(e) {
    console.error('Find Error', e); 
  }
});

module.exports = mongoose.model('books', books);