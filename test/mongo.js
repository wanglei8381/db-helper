var config = require('../config').mongo;
var mongo = require('../db').mongo();
var test = require('assert');
config.type = '';
config.hosts = ["192.168.1.183:27017"];
config.database = "test";
config.user = "";
config.password = "";

mongo.createConnection(function (err, db) {
  console.log('create a connection', db.databaseName);
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@11111',mongo.cache);
});

mongo.createConnection(function (err, db) {
  console.log('create a connection', db.databaseName);
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@11111',mongo.cache);
});

var users = [
  {name: 'wl', pwd: '123'},
  {name: 'srq', pwd: '123'},
  {name: 'jl', pwd: '123'}
];

//mongo.getConnect('appcan', function (err, db) {
//  if (err) return;
//  var user = db.collection('user');
//  //user.insert(users, function (err, list) {
//  //  console.log('###########################################', err, list);
//  //});
//  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2222',mongo.cache);
//  user.find().toArray(function (err, docs) {
//    console.log('###########################################', err, docs);
//    db.close();
//    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@3333',mongo.cache);
//  });
//});

mongo.getConnect('appcan', function (err, db) {
  //db.close();
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2222',mongo.cache);
})

mongo.getConnect('appcan', function (err, db) {
  db.close();
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@3333',mongo.cache);

  mongo.getConnect('appcan', function (err, db) {
    //var user = db.collection('user');
    //user.find().toArray(function (err, docs) {});
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@4444',mongo.cache);
  })
})
