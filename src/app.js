'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = expreess();

const errorHandler = require( './middleware/error.js');
const notFound = require( './middleware/404.js' );

const bookRouter = require('./api/books.js');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(bookRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    if( ! isRunning ) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server Up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  },
};