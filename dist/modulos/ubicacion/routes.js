'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ensureAuthenticated = require('../../middlewares/ensureAuthenticated');

var _ensureAuthenticated2 = _interopRequireDefault(_ensureAuthenticated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Routes = function Routes(config) {
  _classCallCheck(this, Routes);

  this.config = config || {};
  this.Authentication = new _ensureAuthenticated2.default();
  this.routes = [{
    url: '/modulos/ubicacion/:id?',
    methods: ['all', 'get', 'post', 'put', 'delete'],
    handlers: [this.Authentication.ensureAuthenticated, config.controller.main, config.controller.save, config.controller.update, config.controller.destroy]
  }, {
    url: '/modulos/unicaciones/',
    methods: ['all', 'get'],
    handlers: [this.Authentication.ensureAuthenticated, config.controller.all]
  }];
};

exports.default = Routes;