var config = require('../config').mongo;
var mongo = require('../db').mongo();
var db = mongo.db('test');
var test = require('assert');
config.type = '';
config.hosts = ["192.168.1.183:27017"];
config.database = "test";
config.user = "";
config.password = "";

/*mongo.createConnection(function (err, _db) {
 console.log('create a connection', _db.databaseName);
 });*/

db.getCollection('testTable', function (err, user) {
  user.find().toArray(function (err, docs) {
    console.log('1111111111111111111111111111111', err, docs);
  });
});

db.use('appcan').getCollection('user', function (err, user) {
  user.find().toArray(function (err, docs) {
    console.log('22222222222222222222222222222222', err, docs);
  });
});
