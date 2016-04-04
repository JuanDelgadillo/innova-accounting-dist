'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _errorsHandler = require('../../common/errorsHandler');

var _errorsHandler2 = _interopRequireDefault(_errorsHandler);

var _validations = require('../../common/validations');

var _validations2 = _interopRequireDefault(_validations);

var _controllerParent2 = require('../modulos_class/controllerParent');

var _controllerParent3 = _interopRequireDefault(_controllerParent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = function (_controllerParent) {
  _inherits(Controller, _controllerParent);

  function Controller(config) {
    _classCallCheck(this, Controller);

    // No se puede usar this antes te un constructor
    // por tal motivo se hicieron metodos estatico
    var save_rules = Controller.get_save_rules();
    var update_rules = Controller.get_update_rules();
    return _possibleConstructorReturn(this, Object.getPrototypeOf(Controller).call(this, config, _routes2.default, _model2.default, _errorsHandler2.default, _validations2.default, save_rules, update_rules));
  }

  _createClass(Controller, null, [{
    key: 'get_save_rules',
    value: function get_save_rules() {
      return {
        descripcion: {
          required: true
        },
        descripcion_corta: {
          required: true
        },
        activo: {
          booleann: true
        }
      };
    }
  }, {
    key: 'get_update_rules',
    value: function get_update_rules() {
      return {
        codigo: {
          required: true
        },
        descri: {
          required: true
        },
        descorta: {
          required: true
        },
        disponible: {
          booleann: true
        }
      };
    }
  }]);

  return Controller;
}(_controllerParent3.default);

exports.default = Controller;