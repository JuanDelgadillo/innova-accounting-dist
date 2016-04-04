'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _errorsHandler = require('../common/errorsHandler');

var _errorsHandler2 = _interopRequireDefault(_errorsHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Authentication = function () {
  function Authentication() {
    _classCallCheck(this, Authentication);

    this.errors = new _errorsHandler2.default();
  }

  _createClass(Authentication, [{
    key: 'ensureAuthenticated',
    value: function ensureAuthenticated(req, res, next) {
      if (!req.headers.authorization) {
        return this.errors.handleError(req, res, 401, { data: 'Unauthorized' });
      }

      var token = req.headers.authorization.split(' ')[1];
      var payload = _jwtSimple2.default.decode(token, _config2.default.tokenSecret);

      if (payload.exp <= (0, _moment2.default)().unix()) {
        return this.errors.handleError(req, res, 401, { data: 'Token has expired' });
      }
      // console.log(payload)
      // console.log(req.path)
      // console.log(req.method)
      req.user = payload;
      next();
    }
  }]);

  return Authentication;
}();

exports.default = Authentication;