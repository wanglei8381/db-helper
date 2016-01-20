//mongodb配置
exports.mongo = {
  "type": "defalut",
  "hosts": ["192.168.1.183:27017"],
  "database": "test",
  "user": "",
  "password": "",
  "options": {
    "server": {
      "poolSize": 10,
      "reconnectTries": 30,
      "reconnectInterval": 1000
    },
    "db": {
      "native_parser": true
    },
    "replSet": {
      "ha": true,
      "haInterval": 5000,
      "poolSize": 10,
      "replicaSet": ""
    },
    "mongos": {
      "ha": true,
      "haInterval": 5000,
      "poolSize": 10
    }
  },
  "cronTime": "* */10 * * * *",
  "maxConn": 5,
  "mixConn": 2,
  "idle": 300,
  "log": false
};

//redis配置
exports.redis = {
  "type": "sentinel",
  "name": "mymaster",
  "hosts": ["redisSen1:26379", "redisSen2:26379", "redisSen3:26379"],
  "options": {
    "family": "4",
    "db": 1,
    "password": null,
    "enableReadyCheck": true,
    "enableOfflineQueue": true,
    "connectTimeout": 1000,
    "lazyConnect": false
  },
  "maxConn": 10,
  "mixConn": 2,
  "idle": 300,
  "log": false
};