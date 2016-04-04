'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ensureAuthenticated = require('../../middlewares/ensureAuthenticated');

var _ensureAuthenticated2 = _interopRequireDefault(_ensureAuthenticated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CargaInicialRoutes = function CargaInicialRoutes(config) {
  _classCallCheck(this, CargaInicialRoutes);

  this.config = config || {};
  this.controller = config.controller;
  this.authentication = new _ensureAuthenticated2.default();
  this.routes = [{
    url: '/empresa/:id/carga-inicial',
    methods: ['all', 'get', 'put'],
    handlers: [this.authentication.ensureAuthenticated, this.controller.show, this.controller.update]
  }, {
    url: '/empresa/:id/carga-inicial/logo',
    methods: ['all', 'put'],
    handlers: [this.authentication.ensureAuthenticated, this.controller.saveLogo]
  }];
};

exports.default = CargaInicialRoutes;