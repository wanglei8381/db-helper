var poolModule = require('generic-pool');
var mongodb = require('mongodb');
var logger = require('appcan-logger')('[db][mongo][index]');
var _ = require("underscore");
_.mixin(require('underscore.deep'));
var config = require('../../config').mongo;
var MongoClient = mongodb.MongoClient;
var Server = mongodb.Server;
var ReplSet = mongodb.ReplSet;
var Mongos = mongodb.Mongos;
var Db = mongodb.Db;
var Collection = mongodb.Collection;
var status = true;

var mongo = module.exports = function (options) {
  config.options = _.deepExtend(config.options, options);
  //mongodb.Server的实例
  mongo.servers = [];
  //mongodb.Db的实例
  mongo.cache = {};
  //临时缓存的数据库名称
  mongo.stack = [];
  return mongo;
};

/**
 * 创建数据库连接
 * @param callback
 */
mongo.createConnection = function (callback) {
  var _this = this;
  callback = callbackHandler(callback, 'create a mongodb connection');
  var options = config.options;
  var database = config.database;
  var type = config.type;
  this.servers = config.hosts.map(function (ip) {
    var vary = ip.split(':');
    var server = new Server(vary[0], parseInt(vary[1]), options['server']);
  });
  var db = null;
  switch (type) {
    case 'standalone':
      db = new Db(database, this.servers[0], options['db']);
      mongo.openConnection(db, callback);
      break;
    case 'replset':
      var replset = new ReplSet(this.servers, options['replSet']);
      db = new Db(database, replset, options['db']);
      mongo.openConnection(db, callback);
      break;
    case 'cluster':
      var mongos = new Mongos(this.servers, options['mongos']);
      db = new Db(database, mongos, options['db']);
      mongo.openConnection(db, callback);
      break;
    default:
      var usernamePassword = '';
      if (config.user && config.password) {
        usernamePassword = config.user + ':' + encodeURIComponent(config.password) + '@';
      }

      var connString = 'mongodb://' + usernamePassword + config.hosts[0] + '/' + database;
      MongoClient.connect(connString, options, function (err, _db) {
        if (err) {
          logger.debug(' could not connect to your Mongo database. Mongo returned the following error : %s', err.message);
          return callback(err, null);
        }
        _this.cache[database] = _db;
        callback(null, _db);
      });
  }

};

/**
 * 打开数据库连接
 * @param db,mongodb.Db的实例
 * @param callback
 */
mongo.openConnection = function (db, callback) {
  callback = callbackHandler(callback, 'open a mongodb connection');
  var _this = this;
  var database = config.database;
  db.open(function (err, _db) {
    if (err) {
      logger.debug(' could not connect to your Mongo database. Mongo returned the following error : %s', err.message);
      return callback(err, null);
    }
    if (config.user && config.password) {
      _db.authenticate(config.user, config.password, function (err, result) {
        if (err || result === false) {
          return callback(err, null);
        } else {
          _this.cache[database] = _db;
          return callback(null, _db);
        }
      });
    } else {
      _this.cache[database] = _db;
      callback(null, _db);
    }
  });
};

/**
 * 获取一个数据库db实例,
 * 首先会先从缓存中获取，
 * 如果缓存中没有，则使用默认的数据库切换到指定的数据
 * @param dbName
 * @param callback
 */
mongo.getConnect = function (dbName, callback) {
  callback = callbackHandler(callback, 'get a mongodb connection');
  var _this = this;
  var database = config.database;
  var _db = this.cache[dbName];
  if (_db != null && typeof _db === 'object') {
    callback(null, _db);
  } else {
    var _db_default = this.cache[database];
    if (_db_default != null && typeof _db_default === 'object') {
      var _db_select = _db_default.db(dbName);
      this.cache[dbName] = _db_select;
      callback(null, _db_select);
      return;
    }
    var stack = _this.stack;
    stack.push({
      cb: callback,
      dbName: dbName
    });
    // 当有一个连接初始化请求时，挂起其他初始化请求
    // 连接池建立完后，使用该连接处理挂起的请求
    if (status) {
      status = false;
      _this.createConnection(function (err, db) {
        var _db_default = _this.cache[database] = db;
        for (var i = 0, len = stack.length; i < len; i++) {
          var temp = stack.shift();
          var fn = temp.cb;
          var dbName = temp.dbName;
          var _db_select = _this.cache[dbName] = _db_default.db(dbName);
          fn(null, _db_select);
        }
      });
    }
  }
};

/**
 * 监听数据库状态
 * @param db
 * @private
 */
mongo._shutdown = function (db) {
  var dbName = db.databaseName;
  var _this = this;
  if (!_this.cache[dbName]) return;
  db.on('error', function (error) {
    delete _this.cache[dbName];
    logger.debug(' could not connect to the [' + dbName + '] mongo database. Mongo returned the following error : %s', err.message);
  });
  db.on('close', function () {
    delete _this.cache[dbName];
    logger.debug('The [' + dbName + '] mongodb already colse !');
  });
  db.on('fullsetup', function () {
  });
};

function callbackHandler(callback, msg) {
  if (typeof callback !== 'function') {
    callback = function () {
      if (msg) {
        logger.debug(msg + ', did not set the callback function');
      }
    };
  } else {
    return function (err, db) {
      if (!err) {
        mongo._shutdown(db);
      }
      callback(err, db);
    }
  }
  return callback;
}

mongo.db = require('./db');