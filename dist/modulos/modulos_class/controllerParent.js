'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var controllerParent = function () {
  function controllerParent(config, Routes, Model, ErrorsHandler, Validations, save_rules, update_rules) {
    _classCallCheck(this, controllerParent);

    this.config = config || {};
    var routes = new Routes({ controller: this });
    this.routes = routes.routes;
    this.model = new Model();
    this.errors = new ErrorsHandler();
    this.validations = new Validations();
    this.save_rules = save_rules;
    this.update_rules = update_rules;
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

  _createClass(controllerParent, [{
    key: 'all',
    value: function all(req, res) {
      var _this = this;

      var query = req.body;
      query.org_hijo = req.user.org_hijo;
      this.model.all(query, function (err, documentos) {
        _this.error.error.statusCode = 500;
        _this.error.collection.errorMessage = 'Documents not founds.';
        _this.error.collection.statusCode = 404;

        if (_this.errors.handleErrorDb(req, res, err, documentos, _this.error)) {
          res.set('Content-Type', 'application/json');
          return res.status(200).send(documentos);
        }
      });
    }
  }, {
    key: 'main',
    value: function main(req, res) {
      // xxx
    }
  }, {
    key: 'show',
    value: function show(req, res) {
      // xxx
    }
  }, {
    key: 'save',
    value: function save(req, res) {
      var _this2 = this;

      this.error.error.errorMessage = 'Bad request';
      this.error.error.statusCode = 400;

      /* if (!this.validations.hasProperty(req.body, this.rules) || !this.validations.areValids(req.body, this.save_rules)) {
        return this.errors.handleError(req, res, this.error.error.statusCode, { data: this.error.error.errorMessage })
      }*/
      var query = req.body;
      this.model.save(query, function (err, documento) {
        _this2.error.error.statusCode = 500;
        _this2.error.collection.errorMessage = 'Unprocessable Entity.';
        _this2.error.collection.statusCode = 422;

        if (_this2.errors.handleErrorDb(req, res, err, documento, _this2.error)) {
          res.set('Content-Type', 'application/json');
          return res.status(201).send(documento);
        }
      });
    }
  }, {
    key: 'update',
    value: function update(req, res) {
      var _this3 = this;

      req.body.id = req.params.id || '';
      this.rules = {
        id: {
          required: true
        }
      };

      this.error.error.errorMessage = 'Bad request';
      this.error.error.statusCode = 400;

      if (!this.validations.hasProperty(req.body, this.rules) || !this.validations.areValids(req.body, this.update_rules)) {
        return this.errors.handleError(req, res, this.error.error.statusCode, { data: this.error.error.errorMessage });
      }

      var query = req.body;
      this.model.update(query, function (err, document) {
        _this3.error.error.statusCode = 500;
        _this3.error.collection.errorMessage = 'Document not found.';
        _this3.error.collection.statusCode = 404;

        if (_this3.errors.handleErrorDb(req, res, err, document, _this3.error)) {
          res.set('Content-Type', 'application/json');
          return res.status(200).send(document);
        }
      });
    }
  }, {
    key: 'destroy',
    value: function destroy(req, res) {
      var _this4 = this;

      req.body.id = req.params.id || '';
      this.rules = {
        id: {
          required: true
        }
      };

      this.error.error.errorMessage = 'Bad request';
      this.error.error.statusCode = 400;

      if (!this.validations.hasProperty(req.body, this.rules) || !this.validations.areValids(req.body, this.rules)) {
        return this.errors.handleError(req, res, this.error.error.statusCode, { data: this.error.error.errorMessage });
      }

      var query = req.body;
      this.model.destroy(query, function (err, document) {
        _this4.error.error.statusCode = 500;
        _this4.error.collection.errorMessage = 'Document not found.';
        _this4.error.collection.statusCode = 404;

        if (_this4.errors.handleErrorDb(req, res, err, document, _this4.error)) {
          res.set('Content-Type', 'application/json');
          return res.status(200).send();
        }
      });
    }
  }]);

  return controllerParent;
}();

exports.default = controllerParent;