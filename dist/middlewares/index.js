'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('./bodyParser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressStatic = require('./expressStatic');

var _expressStatic2 = _interopRequireDefault(_expressStatic);

var _dataHttpVerification = require('./dataHttpVerification');

var _dataHttpVerification2 = _interopRequireDefault(_dataHttpVerification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  bodyParser: _bodyParser2.default,
  expressStatic: _expressStatic2.default,
  dataHttpVerification: _dataHttpVerification2.default
};