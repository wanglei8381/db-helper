module.exports = function (db) {

  /**
   * 为db添加数据插入操作
   *
   * @param name 集合的名称
   * @param docs 要保存的文档
   * @param opt 选项
   * @param callback 回调函数
   * @api http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#insert
   */
  db.insert = function (name, docs, options, callback) {
    if (!callback) {
      callback = options;
      options = null;
    }
    callback = callbackHandler(callback);
    this.getCollection(name, function (err, collection) {
      collection.insert(docs, options, function (err, ret) {
        callback(err, ret);
      });
    });
  };

  /**
   * 为db添加数据保存更新操作
   *
   * @param name 集合的名称
   * @param docs 要保存的文档
   * @param opt 选项
   * @param callback 回调函数
   * @api http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#save
   */
  db.save = function (name, docs, options, callback) {
    if (!callback) {
      callback = options;
      options = null;
    }
    callback = callbackHandler(callback);
    this.getCollection(name, function (err, collection) {
      collection.save(docs, options, function (err, ret) {
        callback(err, ret);
      });
    });
  };

  /**
   * 为db添加数据删除操作
   *
   * @param name 集合的名称
   * @param filter 查询条件
   * @param opt 选项
   * @param callback 回调函数
   * @api http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#remove
   */
  db.remove = function (name, filter, options, callback) {
    if (!callback) {
      callback = options;
      options = null;
    }
    callback = callbackHandler(callback);
    this.getCollection(name, function (err, collection) {
      collection.remove(filter, options, function (err, ret) {
        callback(err, ret);
      });
    });
  };

  /**
   * 为db添加数据删除操作
   *
   * @param name 集合的名称
   * @param filter 查询条件
   * @param opt 选项
   * @param callback 回调函数
   * @api http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#deleteOne
   */
  db.deleteOne = function (name, filter, options, callback) {
    if (!callback) {
      callback = options;
      options = null;
    }
    callback = callbackHandler(callback);
    this.getCollection(name, function (err, collection) {
      collection.deleteOne(filter, options, function (err, ret) {
        callback(err, ret);
      });
    });
  };

  /**
   * 为db添加数据删除操作
   *
   * @param name 集合的名称
   * @param filter 查询条件
   * @param opt 选项
   * @param callback 回调函数
   * @api http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#deleteMany
   */
  db.deleteMany = function (name, filter, options, callback) {
    if (!callback) {
      callback = options;
      options = null;
    }
    callback = callbackHandler(callback);
    this.getCollection(name, function (err, collection) {
      collection.deleteMany(filter, options, function (err, ret) {
        callback(err, ret);
      });
    });
  };

  /**
   * 为db添加数据更新操作
   *
   * @param name 集合的名称
   * @param filter 查询条件
   * @param opt 选项
   * @param callback 回调函数
   * @api http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#updateMany
   */
  db.updateMany = function (name, filter, update, options, callback) {
    if (!callback) {
      callback = options;
      options = null;
    }
    callback = callbackHandler(callback);
    this.getCollection(name, function (err, collection) {
      collection.updateMany(filter, update, options, function (err, ret) {
        callback(err, ret);
      });
    });
  };

  /**
   * 为db添加数据更新操作
   *
   * @param name 集合的名称
   * @param filter 查询条件
   * @param opt 选项
   * @param callback 回调函数
   * @api http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#updateOne
   */
  db.updateOne = function (name, filter, update, options, callback) {
    if (!callback) {
      callback = options;
      options = null;
    }
    callback = callbackHandler(callback);
    this.getCollection(name, function (err, collection) {
      collection.updateOne(filter, update, options, function (err, ret) {
        callback(err, ret);
      });
    });
  };

  /**
   * 为db添加数据查询操作
   *
   * @param name 集合的名称
   * @param filter 查询条件
   * @param opt 选项
   * @param callback 回调函数
   * @api http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#find
   */
  db.find = function (name, filter, options, callback) {
    if (!callback) {
      callback = options;
      options = {};
    }
    callback = callbackHandler(callback);
    this.getCollection(name, function (err, collection) {
      if (err) return callback(err);
      collection.find(filter, options).toArray(function (err, ret) {
        callback(err, ret);
      });
    });
  };

  /**
   * 为db添加数据查询操作
   *
   * @param name 集合的名称
   * @param filter 查询条件
   * @param opt 选项
   * @param callback 回调函数
   * @api http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOne
   */
  db.findOne = function (name, filter, options, callback) {
    if (!callback) {
      callback = options;
      options = {};
    }
    callback = callbackHandler(callback);
    this.getCollection(name, function (err, collection) {
      collection.findOne(filter, options).toArray(function (err, ret) {
        callback(err, ret);
      });
    });
  };

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