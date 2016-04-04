'use strict';

var _usersScheme = require('../users/usersScheme');

var _usersScheme2 = _interopRequireDefault(_usersScheme);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb://' + _config2.default.mongo.host + '/' + _config2.default.mongo.dataBase, function (err, res) {
  if (err) {
    console.log('Default data ERROR: connecting to Database. ' + err);
    process.exit();
  }
});

var user = new _usersScheme2.default({
  email: 'admin@innova.com',
  password: '12345',
  username: 'Administrador',
  privilege: 1
});

user.save(function (err, doc) {
  if (err) {
    console.log(err);
    return false;
  }

  if (!doc) {
    console.log(err);
    return false;
  }
});
console.log('--------------------------------------------------');
console.log('User data has been loaded');
console.log('--------------------------------------------------');
_mongoose2.default.connection.close();