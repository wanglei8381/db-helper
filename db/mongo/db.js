var mongo = require('./');
var logger = require('appcan-logger')('[db][mongo][db]');
var _ = require("underscore");
var mongodb = require('mongodb');
var Collection = mongodb.Collection;

var proto = module.exports = function (dbName) {
  var _db = {}
  _db.dbName = dbName;
  _db.db = null;
  //缓存集合列表
  _db.cache = {};
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
    //后台存储所有集合
    _this._store();
    callback(err, _db);
  });
  return this;
};

/**
 * 获取指定的集合
 */
proto.getCollection = function (name) {
  var _this = this;
  var argus = arguments;
  var cache = _this.cache[_this.dbName];
  if (!cache) {
    _this.cache[this.dbName] = cache = {};
  }
  var callback = callbackHandler(argus[argus.length - 1]);
  var collection = cache[name];
  if (collection) {
    return callback(null, collection);
  }
  _this.use(_this.dbName, function (err, _db) {
    if (err) return callback(err);
    argus[argus.length - 1] = function (err, coll) {
      if (!err) cache[name] = coll;
      callback(err, coll);
    };
    _this.db.collection.apply(_db, argus);
  });
};

proto.createCollection = function (collectionName, opts, callback) {
  this.db.createCollection(collectionName, opts || {}, callback);
};

/**
 * 查询所有集合
 * @param collectionName
 * @param callback
 */
proto.listCollections = function (collectionName, callback) {
  if (!callback) {
    callback = collectionName;
    collectionName = null;
  }
  callback = callbackHandler(callback);
  this.use(this.dbName, function (err, _db) {
    if (err) return callback(err);
    _db.listCollections(collectionName).toArray(callback);
  });
};

/**
 * 添加所有的集合到缓存中
 * @private
 */
proto._store = function (callback) {
  callback = callbackHandler(callback);
  var _this = this;
  var cache = _this.cache[this.dbName];
  if (!cache) {
    _this.cache[this.dbName] = cache = {};
  }
  this.listCollections(function (err, collections) {
    if (err) return;
    collections.forEach(function (item) {
      cache[item.name] = new Collection(_this.db, _this.db.s.topology, _this.db.s.databaseName, item.name, _this.db.s.pkFactory, {});
    });
    callback(err);
  });
};

//为db添加数据库操作能力
require('./collection')(proto);

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