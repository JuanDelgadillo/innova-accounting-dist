'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _mongodb = require('./database/mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _expressServer = require('./expressServer');

var _expressServer2 = _interopRequireDefault(_expressServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = new _mongodb2.default({
  host: _config2.default.mongo.host,
  dataBase: _config2.default.mongo.dataBase
});

db.connection();

var app = new _expressServer2.default();

var server = _http2.default.createServer(app.expressServer);

server.listen(_config2.default.port, function () {
  return console.log('Server corriendo en http://localhost:' + _config2.default.port);
});