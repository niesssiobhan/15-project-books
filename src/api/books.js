'use strict';

require('dotenv').config();
const express = require('express');
const router = express.Router();
const superagent = require('superagent');
const modelFinder = require('../middleware/model-finder.js');


router.param('model', modelFinder);

router.get('/', getBooks);

router.post('/searches', createSearch);
// check
router.get('/searches/new', newSearch);
// check
router.get('/api/:model/:id', getBook);
// check
router.post('/api/:model', createBook);
// check
router.put('/api/:model/:id', updateBook);
// check
router.delete('/api/:model/:id', deleteBook);

// HELPER FUNCTION
function Book(info) {
  let placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';

  this.title = info.title || 'No title available';
  this.author = info.authors[0] || 'No authors available';
  this.isbn = info.industryIdentifiers ? `ISBN_13 ${info.industryIdentifiers[0].identifier}` : 'No ISBN available';
  this.image_url = info.imageLinks ? info.imageLinks.smallThumbnail : placeholderImage;
  this.description = info.description || 'No description available';
  this.id = info.industryIdentifiers ? `${info.industryIdentifiers[0].identifier}` : '';
}

function getBooks(req,res,next){
  req.model.get()
    .then(data => {
      const output = {
        results: data,
      };
      res.status(200).json(output);      
    })
    .catch(next);              
}

function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => response.render('pages/searches/show', {results: results}))
    .catch(err => handleError(err, response));
}

function newSearch(request, response) {
  response.render('pages/searches/new');
}

function getBook(req,res,next){
  let id = req.params.id;
  req.model.get(id)
    .then(res => res.status(200).json(res[0]))
    .catch(next);
}

function createBook(req,res,next){
  console.log('this was hit');
  console.log(req.model);
  req.model.post(req.body)
    .then(res => res.status(200).json(res))
    .catch(next);
}

function updateBook(req,res,next){
  req.model.put(req.params.id, req.body)
    .then(res => res.status(200).json(res))
    .catch(next);
}

function deleteBook(req,res,next){
  req.model.delete(req.params.id)
    .then(res => res.status(200).json(res))
    .catch(next);
}

// Err Handleing
function handleError(error, response) {
  response.render('pages/error', {error: error});
}

module.exports = router;