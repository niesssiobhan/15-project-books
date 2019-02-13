'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const mongooseOptions = {
  newUserParser: true,
  userCreateParser: true,
};

mongoose.connect(process.env.MONDOGDB_URI, mongooseOptions);

require('./src/server.js').start(process.env.PORT);