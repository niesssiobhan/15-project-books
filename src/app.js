'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errorHandler = require( './middleware/error.js');
const notFound = require( './middleware/404.js' );

const bookRouter = require('./api/books.js');


// EXPRESS APP
const app = express();


// APP LEVEL MIDDLEWARE
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// ROUTES
app.use(bookRouter);


// CATCHALLS
app.use(notFound);
app.use(errorHandler);

let isRunning = false;

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