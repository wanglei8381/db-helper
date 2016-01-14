var mongo = require('./');
var logger = require('appcan-logger')('[db][mongo][db]');
var _ = require("underscore");

var proto = module.exports = function (dbName) {
  var _db = {}
  _db.dbName = dbName;
  _db.db = null;
  _.extend(_db, proto);
  return _db;
};

/**
 * 切换数据库
 * @param dbName
 * @param callback
 * @returns {*}
 */
proto.use = function (dbName, callback) {
  callback = callbackHandler(callback);
  var _this = this;
  _this.dbName = dbName;
  if (dbName == null) {
    if (_this.dbName) {
      return callback(null, _this.db);
    } else {
      return callback(new Error('your db name is null'));
    }
  }

  if (_this.dbName === dbName && _this.db) return callback(null, _this.db);
  mongo.getConnect(dbName, function (err, _db) {
    if (!err) {
      _this.db = _db;
    }
    callback(err, _db);
  });
  return this;
};

/**
 * 获取指定的集合
 */
proto.getCollection = function () {
  var _this = this;
  var argus = arguments;
  var callback = callbackHandler(argus[argus.length - 1]);
  _this.use(_this.dbName, function (err, _db) {
    if (err) return callback(err);
    _this.db.collection.apply(_db, argus);
  });
};

proto.createCollection = function (collectionName, opts, callback) {
  this.db.createCollection(collectionName, opts || {}, callback);
};

function callbackHandler(callback, msg) {
  if (typeof callback !== 'function') {
    callback = function () {
      if (msg) {
        logger.debug(msg + ', did not set the callback function');
      }
    };
  }
  return callback;
}