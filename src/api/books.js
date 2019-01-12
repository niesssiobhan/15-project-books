'use strict';

require('dotenv').config();
const express = require('express');
const router = express.Router();
const superagent = require('superagent');

const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');

app.get('/', getBooks);
app.post('/searches', createSearch);
app.get('/searches/new', newSearch);
app.get('/books/:id', getBook);
app.post('/books', createBook);
app.put('/books/:id', updateBook);
app.delete('/books/:id', deleteBook);

app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));