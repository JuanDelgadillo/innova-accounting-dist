'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import sanitize from 'mongo-sanitize'


var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _usersModel = require('./usersModel');

var _usersModel2 = _interopRequireDefault(_usersModel);

var _errorsHandler = require('../common/errorsHandler');

var _errorsHandler2 = _interopRequireDefault(_errorsHandler);

var _validations = require('../common/validations');

var _validations2 = _interopRequireDefault(_validations);

var _jsonWebTokens = require('../common/jsonWebTokens');

var _jsonWebTokens2 = _interopRequireDefault(_jsonWebTokens);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _usersModel3 = require('../users/usersModel');

var _usersModel4 = _interopRequireDefault(_usersModel3);

var _model = require('../configuracion-general/carga-inicial/model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UsersController = function () {
  function UsersController(config) {
    _classCallCheck(this, UsersController);

    this.config = config || {};
    var routes = new _routes2.default({ controller: this });
    this.routes = routes.routes;
    this.model = new _usersModel2.default();
    this.errors = new _errorsHandler2.default();
    this.validations = new _validations2.default();
    this.jsonWebToken = new _jsonWebTokens2.default();
    this.userModel = new _usersModel4.default();
    this.cargaInicialModel = new _model2.default();
    this.http = _http2.default;

    this.error = {
      error: {
        errorMessage: '',
        statusCode: 404
      },
      collection: {
        errorMessage: '',
        statusCode: 404
      }
    };
  }

  _createClass(UsersController, [{
    key: 'login',
    value: function login(req, res) {
      var _this = this;

      this.rules = {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true
        }
      };

      this.error.error.errorMessage = 'Bad request';
      this.error.error.statusCode = 400;

      if (!this.validations.hasProperty(req.body, this.rules) || !this.validations.areValids(req.body, this.rules)) {
        return this.errors.handleError(req, res, this.error.error.statusCode, { data: this.error.error.errorMessage });
      }

      var query = {
        email: req.body.email.toLowerCase(),
        password: req.body.password
      };

      this.model.login(query, function (err, user) {
        _this.error.error.statusCode = 500;
        _this.error.collection.errorMessage = 'User not found';
        _this.error.collection.statusCode = 404;
        if (err) {
          res.status(_this.error.error.statusCode).send({ data: _this.error.error.errorMessage });
          console.log(err);
          return false;
        }
        if (!user) {
          res.status(_this.error.collection.statusCode).send({ data: _this.error.collection.errorMessage });
          console.log(err);
          return false;
        } else {
          return res.status(200).json({ token: _this.jsonWebToken.createToken(user) });
        }
      });
    }
  }]);

  return UsersController;
}();

exports.default = UsersController;