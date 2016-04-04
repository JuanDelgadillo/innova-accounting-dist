'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _usersScheme = require('./usersScheme');

var _usersScheme2 = _interopRequireDefault(_usersScheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UsersModel = function () {
  function UsersModel(config) {
    _classCallCheck(this, UsersModel);

    this.config = config || {};
    this.Scheme = _usersScheme2.default;
  }

  _createClass(UsersModel, [{
    key: 'show',
    value: function show(query, callback) {
      this.Scheme.findById(query.id, function (err, user) {
        return callback(err, user);
      });
    }
  }, {
    key: 'login',
    value: function login(query, callback) {
      this.Scheme.findOne(query, function (err, user) {
        return callback(err, user);
      });
    }
  }, {
    key: 'save',
    value: function save(query, callback) {
      var new_item = new this.Scheme(query);
      new_item.save(function (err, document) {
        return callback(err, document);
      });
    }
  }, {
    key: 'update',
    value: function update(query, callback) {
      delete query._id;
      this.Scheme.findOneAndUpdate({
        id_data_personal: query.id_data_personal
      }, query).exec(function (err, document) {
        return callback(err, document);
      });
    }
  }, {
    key: 'destroy',
    value: function destroy(query, callback) {
      this.Scheme.findOneAndRemove({
        id_data_personal: query.id_data_personal
      }, function (err, document) {
        return callback(err, document);
      });
    }
  }]);

  return UsersModel;
}();

exports.default = UsersModel;