//mongodb配置
exports.mongo = {
  "type": "cluster",
  "hosts": ["192.168.1.183:27017"],
  "database": "test",
  "user": "admin",
  "password": "admin",
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