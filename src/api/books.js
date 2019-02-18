'use strict';

require('dotenv').config();
const express = require('express');
const router = express.Router();
const superagent = require('superagent');
const books = require('../models/books.js');
const bookshelf = require('../models/bookshelf.js');

const mongoose = require('mongoose');
const mongooseOptions = {
  useNewURIParser:true,
  useCreateIndex:true,
  useFindandModify:false
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

router.get('/', getBooks);
router.post('/searches', createSearch);
router.get('/searches/new', newSearch);
router.get('/api/:model/:id', getBook);
router.post('/api/:model', createBook);
router.put('/api/:model/:id', updateBook);
router.delete('/api/:model/:id', deleteBook);

// HELPER FUNCTION
/**
 *
 * Function that hold objects for the book info
 * @param {*} info
 */
function Book(info) {
  let placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';

  this.title = info.title || 'No title available';
  this.author = info.authors[0] || 'No authors available';
  this.isbn = info.industryIdentifiers ? `ISBN_13 ${info.industryIdentifiers[0].identifier}` : 'No ISBN available';
  this.image_url = info.imageLinks ? info.imageLinks.smallThumbnail : placeholderImage;
  this.description = info.description || 'No description available';
  this.id = info.industryIdentifiers ? `${info.industryIdentifiers[0].identifier}` : '';
}

/**
 *
 * Function to get all books
 * @param req api request object
 * @param res api response object
 * @param next
 */
function getBooks(req,res,next){
  books.find({})
    .then(results => {
      if(results.length) {
        res.render('pages/index', {books: results})
      } else {
        res.render('pages/searches/new');
      }
    })
    .catch(next)
}
    
/**
 *
 * Function that creates a seach
 * @param request api request object
 * @param response api response object
 */
function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => response.render('pages/searches/show', {results: results}))
    .catch(next);
}

/**
 *
 * Function that creates a new search
 * @param request api request object
 * @param response api response object
 */
function newSearch(request, response) {
  response.render('pages/searches/new');
}

/**
 *
 * Function that gets a new book
 * @param req api request object
 * @param res api response object
 * @param next
 */
function getBook(req,res,next){
  books.findById(req.params.id)
  .then(book => {
    return bookshelves.find()
    .then(shelves => res.render('pages/books/show', {book:book, bookshelves:shelves}))
  })
  .catch(next);
}

/**
 *
 * Function that creates a book
 * @param req api request object
 * @param res api response object
 * @param next
 */
function createBook(req,res,next){
  createShelf (request.body.bookshelf)
  .then(shelf => {
    let record = request.body;
    record.bookshelf_id = shelf._id;
    let book = new books(record);
    book.save()
    .then(res => res.redirect(`/books/${result._id}`))
    .catch(next);
  })
}

/**
 *
 *Funtion creates a new bookshelf
 * @param {*} shelf
 * @returns
 */
function createShelf(shelf) {
  let normalizedShelf = shelf.toLowerCase();
  return bookshelves.findOneAndUpdate(
    {bookshelf: normalizedShelf},
    {bookshelf: normalizedShelf},
    {upsert: true, new: true}
  );
}

/**
 *
 * Function that updates a book
 * @param req api request object
 * @param res api response object
 * @param next
 */
function updateBook(req,res,next){
  books.findByIdAndUpdate(res.params.id, request.body)
  .then(res.redirect(`/books/${req.params.id}`))
  .catch(next)
}

/**
 *
 * Function that deletes a book
 * @param req api request object
 * @param res api response object
 * @param next
 */
function deleteBook(req,res,next){
  books.findByIdAndDelete(res.params.id, request.body)
  .then(res.redirect('/'))
  .catch(next)
}

// Err Handleing
/**
 *
 * Function that handles errors
 * @param error
 * @param response
 */
function handleError(error, response) {
  response.render('pages/error', {error: error});
}

module.exports = router;