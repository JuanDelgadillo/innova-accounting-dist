'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('./controllers/');

var _controllers2 = _interopRequireDefault(_controllers);

var _middlewares = require('./middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExpressServer = function () {
  function ExpressServer(config) {
    var _this = this;

    _classCallCheck(this, ExpressServer);

    config = config || {};
    this.expressServer = (0, _express2.default)();
    this.routes = _express2.default.Router();

    for (var middleware in _middlewares2.default) {
      _middlewares2.default[middleware].forEach(function (currentValue, index) {
        _this.expressServer.use(currentValue);
      });
    }

    var _loop = function _loop(index) {
      var controller = new _controllers2.default[index]();
      controller.routes.forEach(function (currentValue, index) {
        var route = controller.routes[index];
        _this.router(route.methods, route.url, route.handlers, controller);
      });
    };

    for (var index in _controllers2.default) {
      _loop(index);
    }
    this.expressServer.use(this.routes);
  }

  _createClass(ExpressServer, [{
    key: 'router',
    value: function router(methods, urlController, handlers, controller) {
      var url = this.routes.route(urlController);
      methods.forEach(function (currentValue, index) {
        url[currentValue](handlers[index].bind(controller));
      });
    }
  }]);

  return ExpressServer;
}();

exports.default = ExpressServer;