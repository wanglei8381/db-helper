'use strict';

var mongo = require('../db').mongo();
var db = mongo.db('test');
var ObjectId = require('mongodb').ObjectID;

exports.findOne = function (name, filter, options, callback) {
  if (filter['_id']) {
    filter['_id'] = new ObjectId(filter['_id']);
  }
  db.findOne(name, filter, options, callback);
};