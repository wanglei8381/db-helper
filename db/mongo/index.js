var poolModule = require('generic-pool');
var mongodb = require('mongodb');
var _ = require("underscore");
_.mixin(require('underscore.deep'));
var config = require('../../config').mongo;
var MongoClient = mongodb.MongoClient;
var Server = mongodb.Server;
var ReplSet = mongodb.ReplSet;
var Mongos = mongodb.Mongos;
var Db = mongodb.Db;
var Collection = mongodb.Collection;

var mongo = module.exports = function (options) {
  config.options = _.deepExtend(config.options, options);
  return mongo;
};

mongo.createConnection = function (callback) {

};