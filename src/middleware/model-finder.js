'use strict';

const modelFinder = (req,res, next) => {

  let modelName = req.params.model;
  console.log(modelName);

  req.model = require(`../models/books/${modelName}.js`);

  next();

};


module.exports = modelFinder;