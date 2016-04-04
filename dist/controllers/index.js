'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _homeController = require('../home/homeController');

var _homeController2 = _interopRequireDefault(_homeController);

var _usersController = require('../users/usersController');

var _usersController2 = _interopRequireDefault(_usersController);

var _controller = require('../modulos/activos/controller');

var _controller2 = _interopRequireDefault(_controller);

var _controller3 = require('../modulos/centro-costo/controller');

var _controller4 = _interopRequireDefault(_controller3);

var _controller5 = require('../modulos/cuentas-contable/controller');

var _controller6 = _interopRequireDefault(_controller5);

var _controller7 = require('../modulos/moneda/controller');

var _controller8 = _interopRequireDefault(_controller7);

var _controller9 = require('../modulos/ubicacion/controller');

var _controller10 = _interopRequireDefault(_controller9);

var _controller11 = require('../modulos/organizacion/controller');

var _controller12 = _interopRequireDefault(_controller11);

var _controller13 = require('../modulos/tipo/controller');

var _controller14 = _interopRequireDefault(_controller13);

var _controller15 = require('../modulos/zona/controller');

var _controller16 = _interopRequireDefault(_controller15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  home: _homeController2.default,
  users: _usersController2.default,
  activos: _controller2.default,
  centro_costo: _controller4.default,
  cuentas_contable: _controller6.default,
  moneda: _controller8.default,
  ubicacion: _controller10.default,
  organizacion: _controller12.default,
  tipo: _controller14.default,
  zona: _controller16.default
};
// import directores from '../directores/controller'