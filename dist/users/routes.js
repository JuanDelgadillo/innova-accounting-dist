'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Routes = function Routes(config) {
  _classCallCheck(this, Routes);

  this.config = config || {};
  this.routes = [{
    url: '/login',
    methods: ['post'],
    handlers: [config.controller.login]
  }];
};

exports.default = Routes;