'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {
  port: 7000,
  mongo: {
    dataBase: process.env.npm_config_environment ? 'innova-account-develop' : 'innova-account',
    host: 'localhost'
  },
  environment: process.env.npm_config_environment || 'production',
  tokenSecret: process.env.TOKEN_SECRET || 'tokenultrasecreto',
  tokenTest: 'Beaer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Njc0ZDIzYWU3ZGJmNTEyNWIwMDAwMDEiLCJ1c2VybmFtZSI6IkFkbWluaXN0cmFkb3IiLCJpYXQiOjE0NTA3MDg1NTYsImV4cCI6MTQ2MzY2ODU1Nn0.MS2908CO_QE82et3F0y2y17kVpVW4sAYYbVMlw4n6cc'
};

exports.default = config;