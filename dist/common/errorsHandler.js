"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ErrorsHandler = function () {
  function ErrorsHandler(config) {
    _classCallCheck(this, ErrorsHandler);

    this.config = config || {};
  }

  _createClass(ErrorsHandler, [{
    key: "handleErrorDb",
    value: function handleErrorDb(req, res, error, collections, infoError) {
      if (error) {
        res.status(infoError.error.statusCode).send({ data: infoError.error.errorMessage });
        console.log(error);
        return false;
      }

      if (!collections) {
        res.status(infoError.collection.statusCode).send({ data: infoError.collection.errorMessage });
        console.log(error);
        return false;
      }

      return true;
    }
  }, {
    key: "handleError",
    value: function handleError(req, res, statusCode, data) {
      res.status(statusCode).send(data);
    }
  }]);

  return ErrorsHandler;
}();

exports.default = ErrorsHandler;