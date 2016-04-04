'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoSanitize = require('mongo-sanitize');

var _mongoSanitize2 = _interopRequireDefault(_mongoSanitize);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validations = function () {
  function Validations(config) {
    _classCallCheck(this, Validations);

    this.config = config || {};
    this.regularExpressions = {
      email: this.isEmail,
      required: this.isEmpty,
      number: this.isNumber,
      phone: this.isPhone,
      firstOrLastName: this.firstOrLastName,
      date: this.isDate,
      string: this.isString,
      object: this.object,
      array: this.isArray,
      radio: this.selectOrRadio,
      select: this.selectOrRadio,
      checkbox: this.checkbox,
      intervalsOfYears: this.intervalsOfYears,
      booleann: this.booleann,
      optionallyRequired: this.optionallyRequired
    };
    this.valid = true;
  }

  _createClass(Validations, [{
    key: 'isEmail',
    value: function isEmail(value) {
      return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value)
      );
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(value) {
      return value === null || value.length === 0 || /^\s+$/.test(value);
    }
  }, {
    key: 'isNumber',
    value: function isNumber(value) {
      return (/^[0-9]+$/.test(value)
      );
    }
  }, {
    key: 'firstOrLastName',
    value: function firstOrLastName(value) {
      return (/^[A-Za-záéíóúñ]{2,}([\s][A-Za-záéíóúñ]{2,})?$/.test(value)
      );
    }
  }, {
    key: 'isDate',
    value: function isDate(value) {
      var date = new Date(value);
      return date.toString() !== 'Invalid Date';
    }
  }, {
    key: 'isString',
    value: function isString(value) {
      return typeof value === 'string';
    }
  }, {
    key: 'object',
    value: function object(fields, rules, that) {
      return (typeof fields === 'undefined' ? 'undefined' : _typeof(fields)) === 'object' ? that.areValids(fields, rules) : false;
    }
  }, {
    key: 'isPhone',
    value: function isPhone(value) {
      return (/^\(([0-9]{3,3})\)\s([0-9]{3,3})\-([0-9]{4,4})$/.test(value)
      );
    }
  }, {
    key: 'isArray',
    value: function isArray(value) {
      return value instanceof Array;
    }
  }, {
    key: 'selectOrRadio',
    value: function selectOrRadio(value, values) {
      return values.indexOf(value) !== -1;
    }
  }, {
    key: 'checkbox',
    value: function checkbox(checkboxT, checkboxF) {
      return !(checkboxT === true && checkboxF === true);
    }
  }, {
    key: 'intervalsOfYears',
    value: function intervalsOfYears(value) {
      return (/^[0-9]{4}\s\-\s[0-9]{4}$/.test(value)
      );
    }
  }, {
    key: 'booleann',
    value: function booleann(value) {
      return typeof value === 'boolean';
    }
  }, {
    key: 'optionallyRequired',
    value: function optionallyRequired(fields, that) {
      var empty = 0;

      for (var field in fields) {
        if (that.isEmpty(fields[field])) {
          empty++;
        }
      }
      return empty === _underscore2.default.size(fields) || empty === 0;
    }
  }, {
    key: 'hasProperty',
    value: function hasProperty(object, rules) {
      for (var property in rules) {
        if (!object.hasOwnProperty(property)) {
          console.log('Error of validation: The object has not the property: ' + property);
          return false;
        } else {
          this.valid = true;
        }
      }
      return this.valid;
    }
  }, {
    key: 'areValids',
    value: function areValids(req, rules) {
      for (var field in rules) {
        req[field] = (0, _mongoSanitize2.default)(req[field]);

        for (var property in rules[field]) {
          if (rules[field]['required'] === undefined && property !== 'object' && property !== 'checkbox') {
            if (this.isEmpty(req[field])) {
              continue;
            }
          }

          if (property === 'email' && this.regularExpressions[property](req[field]) === false) {
            console.log('Error of validation: Fail email ' + field + ' of value ' + req[field]);
            return false;
          }

          if (property === 'required' && this.regularExpressions[property](req[field]) === true) {
            console.log('Error of validation: Fail required ' + field + ' of value ' + req[field]);
            return false;
          }

          if (property === 'number' && this.regularExpressions[property](req[field]) === false) {
            console.log('Error of validation: Fail number ' + field + ' of value ' + req[field]);
            return false;
          }

          if (property === 'firstOrLastName' && this.regularExpressions[property](req[field]) === false) {
            console.log('Error of validation: Fail firstOrLastName ' + field + ' of value ' + req[field]);
            return false;
          }

          if (property === 'date' && this.regularExpressions[property](req[field]) === false) {
            console.log('Error of validation: Fail date ' + field + ' of value ' + req[field]);
            return false;
          }

          if (property === 'string' && this.regularExpressions[property](req[field]) === false) {
            console.log('Error of validation: Fail string ' + field + ' of value ' + req[field]);
            return false;
          }

          if (property === 'object' && this.regularExpressions[property](req[field], rules[field]['fields'], this) === false) {
            console.log('Error of validation: Fail object ' + field + ' of value ' + req[field]);
            return false;
          }

          if (property === 'radio' && this.regularExpressions[property](req[field], rules[field]['values']) === false) {
            console.log('Error of validation: Fail radio ' + field + ' of value ' + req[field]);
            return false;
          }

          if (property === 'select' && this.regularExpressions[property](req[field], rules[field]['values']) === false) {
            console.log('Error of validation: Fail select ' + field + ' of value ' + req[field]);
            return false;
          }

          if (property === 'checkbox' && this.regularExpressions[property](req[field + 'T'], req[field + 'F']) === false) {
            console.log('Error of validation: Fail checkbox ' + field + ' of value ' + req[field]);
            return false;
          }

          if (property === 'intervalsOfYears' && this.regularExpressions[property](req[field]) === false) {
            console.log('Error of validation: Fail intervalsOfYears ' + field + ' of value ' + req[field]);
            return false;
          }

          if (property === 'booleann' && this.regularExpressions[property](req[field]) === false) {
            console.log('Error of validation: Fail booleann ' + field + ' of value ' + req[field]);
            return false;
          }

          if (property === 'optionallyRequired' && this.regularExpressions[property](req[field], this) === false) {
            console.log('Error of validation: Fail optionallyRequired ' + field + ' of value ' + req[field]);
            return false;
          }

          if (property === 'isPhone' && this.regularExpressions[property](req[field]) === false) {
            console.log('Error of validation: Fail isPhone ' + field + ' of value ' + req[field]);
            return false;
          }

          if (property === 'array' && this.regularExpressions[property](req[field]) === false) {
            console.log('Error of validation: Fail Array Required ' + field + ' of value ' + req[field]);
            return false;
          }
        }
      }
      return true;
    }
  }]);

  return Validations;
}();

exports.default = Validations;