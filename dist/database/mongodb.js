'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Db = function () {
  function Db(config) {
    _classCallCheck(this, Db);

    this.config = config || {};
    this.environment = _config2.default.environment;
    this.host = this.config.host;
    this.dataBase = this.config.dataBase;
  }

  _createClass(Db, [{
    key: 'dropCollections',
    value: function dropCollections(mongoose) {
      var collections = _underscore2.default.keys(mongoose.connection.collections);
      _async2.default.forEach(collections, function (collectionName, done) {
        var collection = mongoose.connection.collections[collectionName];
        collection.drop(function (err) {
          if (err && err.message !== 'ns not found') {
            done(err);
          } else {
            done(null);
          }
        });
      }, function () {
        return console.log('All collections has been deleted');
      });
    }
  }, {
    key: 'connection',
    value: function connection() {
      var _this = this;

      _mongoose2.default.connect('mongodb://' + this.host + '/' + this.dataBase, function (err, res) {
        if (err) {
          console.log('ERROR: connecting to Database. ' + err);
          process.exit();
        } else {
          console.log('Connected to Database ' + _this.dataBase);
        }
      });

      if (this.environment === 'develop') this.dropCollections(_mongoose2.default);
    }
  }, {
    key: 'close',
    value: function close() {
      _mongoose2.default.connection.close();
    }
  }]);

  return Db;
}();

exports.default = Db;