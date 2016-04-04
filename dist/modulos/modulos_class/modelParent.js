"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var modelParent = function () {
  function modelParent(config, Scheme) {
    _classCallCheck(this, modelParent);

    this.config = config || {};
    this.Scheme = Scheme;
  }

  _createClass(modelParent, [{
    key: "all",
    value: function all(query, callback) {
      this.Scheme.find({
        org_hijo: query.org_hijo
      }).exec(function (err, documents) {
        return callback(err, documents);
      });
    }
  }, {
    key: "show",
    value: function show(query, callback) {
      this.Scheme.find({
        _id: query.id
      }).exec(function (err, documents) {
        return callback(err, documents);
      });
    }
  }, {
    key: "save",
    value: function save(query, callback) {
      console.log(query);
      var new_item = new this.Scheme(query);
      new_item.save(function (err, collection) {
        return callback(err, collection);
      });
    }
  }, {
    key: "update",
    value: function update(query, callback) {
      delete query._id;
      this.Scheme.findOneAndUpdate({
        _id: query.id
      }, query).exec(function (err, documents) {
        return callback(err, documents);
      });
    }
  }, {
    key: "destroy",
    value: function destroy(query, callback) {
      this.Scheme.findOneAndRemove({
        _id: query.id
      }, function (err, documents) {
        return callback(err, documents);
      });
    }
  }]);

  return modelParent;
}();

exports.default = modelParent;