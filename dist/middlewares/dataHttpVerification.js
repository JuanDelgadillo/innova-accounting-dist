'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errorsHandler = require('../common/errorsHandler');

var _errorsHandler2 = _interopRequireDefault(_errorsHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataHttpVerification = function DataHttpVerification(err, req, res, next) {
  var errors = new _errorsHandler2.default();

  if (err.status === 400 && err.name === 'SyntaxError' && err.body) {
    errors.handleError(req, res, 400, { data: 'Bad request.' });
  }
};

exports.default = [DataHttpVerification];