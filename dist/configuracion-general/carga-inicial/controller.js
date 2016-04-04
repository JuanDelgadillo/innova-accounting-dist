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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CargaInicialAcademiaController = function () {
  function CargaInicialAcademiaController(config) {
    _classCallCheck(this, CargaInicialAcademiaController);

    this.config = config || {};
    var routes = new _routes2.default({ controller: this });
    this.routes = routes.routes;
    this.model = new _model2.default();
    this.errors = new _errorsHandler2.default();
    this.validations = new _validations2.default();
    this.rules = {
      update: {
        identidadFiscal: {
          string: true,
          required: true
        },
        porcentajeRetraso: {
          number: true,
          required: true
        },
        tiempoTolerancia: {
          number: true,
          required: true
        },
        proximoNroFactura: {
          number: true,
          required: true
        },
        tipoMoneda: {
          required: true,
          select: true,
          values: ['Bolivar', 'Dolar', 'Euro', 'Peso Argentino', 'Peso Colombiano']
        },
        descripcion: {
          string: true,
          required: true
        },
        impuesto: {
          required: true
        }
      }
    };

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

  _createClass(CargaInicialAcademiaController, [{
    key: 'show',
    value: function show(req, res) {
      var _this = this;

      this.error.error.errorMessage = 'Bad request';
      this.error.error.statusCode = 400;
      req.body.id = req.user.sub || '';
      this.rules.show = {
        id: {
          required: true
        }
      };

      if (!this.validations.hasProperty(req.body, this.rules.show) || !this.validations.areValids(req.body, this.rules.show)) {
        return this.errors.handleError(req, res, this.error.error.statusCode, { data: this.error.error.errorMessage });
      }

      var query = req.body;
      query.id = req.user.privilege === 2 ? req.user.sub : req.user.relacion_id;
      this.model.show(query, function (err, document) {
        _this.error.error.statusCode = 400;
        _this.error.collection.errorMessage = 'Entity not found';
        _this.error.collection.statusCode = 404;

        if (_this.errors.handleErrorDb(req, res, err, document, _this.error)) {
          res.status(200).json(document);
        }
      });
    }
  }, {
    key: 'update',
    value: function update(req, res) {
      var _this2 = this;

      this.error.error.errorMessage = 'Bad request';
      this.error.error.statusCode = 400;
      req.body.id = req.user.sub || '';
      this.rules.update.id = {
        required: true
      };

      if (!this.validations.hasProperty(req.body, this.rules.update) || !this.validations.areValids(req.body, this.rules.update)) {
        return this.errors.handleError(req, res, this.error.error.statusCode, { data: this.error.error.errorMessage });
      }

      var query = req.body;

      this.model.update(query, function (err, document) {
        _this2.error.error.statusCode = 400;
        _this2.error.collection.errorMessage = 'Entity not found';
        _this2.error.collection.statusCode = 404;

        if (_this2.errors.handleErrorDb(req, res, err, document, _this2.error)) {
          res.status(200).json({ carga_inicial: document });
        }
      });
    }
  }, {
    key: 'saveLogo',
    value: function saveLogo(req, res) {
      var _this3 = this;

      this.error.error.errorMessage = 'Bad request';
      this.error.error.statusCode = 400;
      req.body.id = req.params.id || '';
      this.rules.fotoSave = {
        id: {
          required: true
        }
      };

      if (!this.validations.hasProperty(req.body, this.rules.fotoSave) || !this.validations.areValids(req.body, this.rules.fotoSave)) {
        return this.errors.handleError(req, res, this.error.error.statusCode, { data: this.error.error.errorMessage });
      }

      var query = req.body;
      query.empresa_id = req.user.sub;
      var storage = _multer2.default.diskStorage({
        destination: function destination(req, file, cb) {
          return cb(null, 'public/assets/img/academy-pics/');
        },
        filename: function filename(req, file, cb) {
          var fileName = query.id + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
          query.logotipoAcademia = fileName;
          _this3.model.update(query, function (err, document) {
            _this3.error.error.statusCode = 400;
            _this3.error.collection.errorMessage = 'Entity not found';
            _this3.error.collection.statusCode = 404;

            _this3.errors.handleErrorDb(req, res, err, document, _this3.error);
          });
          cb(null, fileName);
        }
      });

      var upload = (0, _multer2.default)({
        storage: storage
      }).single('photo');

      this.model.show(query, function (err, document) {
        _this3.error.error.statusCode = 400;
        _this3.error.collection.errorMessage = 'Entity not found';
        _this3.error.collection.statusCode = 404;

        if (_this3.errors.handleErrorDb(req, res, err, document, _this3.error)) {
          upload(req, res, function (err) {
            if (err) return res.status(400).json({ data: _this3.error.error.errorMessage });
            if (req.method === 'PUT' && document.logotipoAcademia !== '' && document.logotipoAcademia !== query.logotipoAcademia) {
              _fs2.default.unlink('public/assets/img/academy-pics/' + document.logotipoAcademia, function (err) {
                if (err) console.error(err);
              });
            }
            res.status(201).json({ error_code: 0, err_desc: null });
          });
        }
      });
    }
  }, {
    key: 'saveNormas',
    value: function saveNormas(req, res) {
      var _this4 = this;

      this.error.error.errorMessage = 'Bad request';
      this.error.error.statusCode = 400;
      req.body.id = req.params.id || '';
      this.rules.rulesSave = {
        id: {
          required: true
        }
      };

      if (!this.validations.hasProperty(req.body, this.rules.rulesSave) || !this.validations.areValids(req.body, this.rules.rulesSave)) {
        return this.errors.handleError(req, res, this.error.error.statusCode, { data: this.error.error.errorMessage });
      }

      var query = req.body;
      query.empresa_id = req.user.sub;
      var storage = _multer2.default.diskStorage({
        destination: function destination(req, file, cb) {
          return cb(null, 'public/documentos/normas/');
        },
        filename: function filename(req, file, cb) {
          var fileName = query.id + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
          query.academyRules = fileName;
          _this4.model.update(query, function (err, document) {
            _this4.error.error.statusCode = 400;
            _this4.error.collection.errorMessage = 'Entity not found';
            _this4.error.collection.statusCode = 404;

            _this4.errors.handleErrorDb(req, res, err, document, _this4.error);
          });
          cb(null, fileName);
        }
      });

      var upload = (0, _multer2.default)({
        storage: storage
      }).single('rules');

      this.model.show(query, function (err, document) {
        _this4.error.error.statusCode = 400;
        _this4.error.collection.errorMessage = 'Entity not found';
        _this4.error.collection.statusCode = 404;

        if (_this4.errors.handleErrorDb(req, res, err, document, _this4.error)) {
          upload(req, res, function (err) {
            if (err) return res.status(400).json({ data: _this4.error.error.errorMessage });
            if (req.method === 'PUT' && document.academyRules !== '' && document.academyRules !== query.academyRules) {
              _fs2.default.unlink('public/documentos/normas/' + document.academyRules, function (err) {
                if (err) console.error(err);
              });
            }
            res.status(201).json({ error_code: 0, err_desc: null });
          });
        }
      });
    }
  }, {
    key: 'saveProcedimientos',
    value: function saveProcedimientos(req, res) {
      var _this5 = this;

      this.error.error.errorMessage = 'Bad request';
      this.error.error.statusCode = 400;
      req.body.id = req.params.id || '';
      this.rules.rulesSave = {
        id: {
          required: true
        }
      };

      if (!this.validations.hasProperty(req.body, this.rules.rulesSave) || !this.validations.areValids(req.body, this.rules.rulesSave)) {
        return this.errors.handleError(req, res, this.error.error.statusCode, { data: this.error.error.errorMessage });
      }

      var query = req.body;
      query.empresa_id = req.user.sub;
      var storage = _multer2.default.diskStorage({
        destination: function destination(req, file, cb) {
          return cb(null, 'public/documentos/procedimientos/');
        },
        filename: function filename(req, file, cb) {
          var fileName = query.id + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
          query.academyProcedures = fileName;
          _this5.model.update(query, function (err, document) {
            _this5.error.error.statusCode = 400;
            _this5.error.collection.errorMessage = 'Entity not found';
            _this5.error.collection.statusCode = 404;

            _this5.errors.handleErrorDb(req, res, err, document, _this5.error);
          });
          cb(null, fileName);
        }
      });

      var upload = (0, _multer2.default)({
        storage: storage
      }).single('procedures');

      this.model.show(query, function (err, document) {
        _this5.error.error.statusCode = 400;
        _this5.error.collection.errorMessage = 'Entity not found';
        _this5.error.collection.statusCode = 404;

        if (_this5.errors.handleErrorDb(req, res, err, document, _this5.error)) {
          upload(req, res, function (err) {
            if (err) return res.status(400).json({ data: _this5.error.error.errorMessage });
            if (req.method === 'PUT' && document.academyProcedures !== '' && document.academyProcedures !== query.academyProcedures) {
              _fs2.default.unlink('public/documentos/procedimientos/' + document.academyProcedures, function (err) {
                if (err) console.error(err);
              });
            }
            res.status(201).json({ error_code: 0, err_desc: null });
          });
        }
      });
    }
  }]);

  return CargaInicialAcademiaController;
}();

exports.default = CargaInicialAcademiaController;