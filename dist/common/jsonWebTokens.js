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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsonWebTokens = function () {
  function JsonWebTokens() {
    _classCallCheck(this, JsonWebTokens);

    this.config = _config2.default;
  }

  _createClass(JsonWebTokens, [{
    key: 'createToken',
    value: function createToken(user) {
      this.payload = {
        sub: user._id,
        username: user.username,
        privilege: user.privilege,
        org_hijo: 'INNOVA01',
        iat: (0, _moment2.default)().unix(),
        exp: (0, _moment2.default)().add(5, 'days').unix()
      };

      return _jwtSimple2.default.encode(this.payload, _config2.default.tokenSecret);
    }
  }]);

  return JsonWebTokens;
}();

exports.default = JsonWebTokens;