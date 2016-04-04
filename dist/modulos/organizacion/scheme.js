'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheme = new Schema({
  org_hijo: { type: String, default: 'INNOVA01' },
  cod_padre: { type: String, default: 'INNOVA01' },
  codigo: { type: String },
  descri: { type: String },
  descorta: { type: String },
  disponible: { type: Boolean },
  reg_estatus: { type: Boolean },
  reg_usu_cc: { type: String, default: 'SYSTEM' },
  reg_usu_cu: { type: String, default: 'SYSTEM' },
  reg_usu_fc: { type: Date, default: Date.now },
  reg_usu_fu: { type: Date, default: Date.now }
});

exports.default = mongoose.model('organizaciones', scheme);