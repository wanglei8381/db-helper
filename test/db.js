var mongo = require('../db').mongo();
var db = mongo.db('test');
var ObjectId = require('mongodb').ObjectID;
/*mongo.createConnection(function (err, _db) {
 console.log('create a connection', _db.databaseName);
 });*/
/*
 db._store(function () {
 db.getCollection('testTable2', function (err, user) {
 user.find().toArray(function (err, docs) {
 console.log('1111111111111111111111111111111', err, docs);
 });
 });

 db.getCollection('testTable2', function (err, user) {
 user.find().toArray(function (err, docs) {
 console.log('222222222222222222222', err, docs);
 });
 });
 });*/


//db.use('appcan').getCollection('user', function (err, user) {
//  user.find().toArray(function (err, docs) {
//    console.log('22222222222222222222222222222222', err, docs);
//  });
//});

/*
 db.listCollections(function (err, docs) {
 console.log('#########################', err, docs);
 });*/

/**
 { result: { ok: 1, n: 1 },
  ops:
   [ { userId: 'ZY0001',
       updatedAt: Fri Jan 15 2016 15:43:36 GMT+0800 (中国标准时间),
       _id: 5698a3281c7fe3180c8c1038 } ],
  insertedCount: 1,
  insertedIds: [ [ '0' ], 5698a3281c7fe3180c8c1038 ] }
 */
/*
 db.insert('vote', [{'userId': 'ZY0002', updatedAt: new Date()}, {
 'userId': 'ZY0003',
 updatedAt: new Date()
 }], function (err, res) {
 console.log(err, res);
 });*/

/*db.find('vote', {}, function (err, res) {
 console.log(err, res);
 });*/

/*db.updateOne('vote', {'_id': new ObjectId('5698a4983a43329806f16a58')}, {'userId': 'ZY8888'}, function (err, res) {
  console.log(err, res.result);
});*/

db.find('vote', {'_id': new ObjectId('5698a4983a43329806f16a58')}, function (err, res) {
  console.log(err, res);
});
