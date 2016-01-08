/**
 *
 s
 serverConfig
 bufferMaxEntries
 databaseName
 options
 native_parser
 slaveOk
 writeConcern
 open:打开一个数据库连接
 command
 close：关闭一个数据库连接
 admin：获得admin用户
 collection:获取集合
 createCollection：创建一个集合
 stats
 listCollections：show collections
 eval
 renameCollection
 dropCollection
 dropDatabase
 collections
 executeDbAdminCommand
 createIndex
 ensureIndex
 addChild
 db:切换db,类似use
 addUser
 removeUser
 authenticate
 logout
 indexInformation
 */



var MongoClient = require('mongodb').MongoClient,
  test = require('assert');

var url = 'mongodb://appcan:appcan@42.96.172.127:27017/appcan';
MongoClient.connect(url, function (err, db) {
  console.log('###########################', err);
  if (err) return;

  db.listCollections({}).toArray(function (err, items) {
    console.log('##############', err, items);
    if (err) return;
    test.ok(items.length >= 1);
    db.close();
  });
});