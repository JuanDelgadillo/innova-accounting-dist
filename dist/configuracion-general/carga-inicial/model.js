'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scheme = require('./scheme');

var _scheme2 = _interopRequireDefault(_scheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CargaInicialAcademiaModel = function () {
  function CargaInicialAcademiaModel(config) {
    _classCallCheck(this, CargaInicialAcademiaModel);

    this.config = config || {};
    this.Scheme = _scheme2.default;
  }

  _createClass(CargaInicialAcademiaModel, [{
    key: 'show',
    value: function show(query, callback) {
      this.Scheme.findOne({
        empresa_id: query.empresa_id
      }, function (err, document) {
        return callback(err, document);
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
        empresa_id: query.empresa_id
      }, query).exec(function (err, document) {
        return callback(err, document);
      });
    }
  }, {
    key: 'destroy',
    value: function destroy(query, callback) {
      this.Scheme.findOneAndRemove({
        _id: query.id
      }, function (err, document) {
        return callback(err, document);
      });
    }
  }, {
    key: 'all',
    value: function all(query, callback) {
      this.Scheme.find({}).exec(function (err, documents) {
        return callback(err, documents);
      });
    }
  }]);

  return CargaInicialAcademiaModel;
}();

exports.default = CargaInicialAcademiaModel;