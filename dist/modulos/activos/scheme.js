'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheme = new Schema({
  org_hijo: { type: String, default: 'INNOVA01' },
  cod_padre: { type: String },
  codigo: { type: String },
  descri: { type: String },
  descorta: { type: String },
  cta_ajuste: { type: String },
  cta_correccion: { type: String },
  fecha_apertura: { type: Date },
  fecha_inactiva: { type: Date },
  saldo_ini: { type: Number },
  saldo_act: { type: Number },
  saldo_iniaju: { type: Number },
  cod_moneda: { type: String },
  cod_costo: { type: String },
  es_fijo: { type: Boolean },
  es_base: { type: Boolean },
  es_auxiliar: { type: Boolean },
  es_efectivo: { type: Boolean },
  es_doc: { type: Boolean },
  es_docfec: { type: Boolean },
  es_costo: { type: Boolean },
  es_audita: { type: Boolean },
  es_movimiento: { type: Boolean },
  tipo_actividad: { type: String },
  tipo_auxiliar: { type: String },
  monto_efeini: { type: Number },
  monto_debini: { type: Number },
  monto_debact: { type: Number },
  monto_debajuini: { type: Number },
  monto_debajuact: { type: Number },
  monto_habini: { type: Number },
  monto_habact: { type: Number },
  monto_habajuini: { type: Number },
  monto_habajuact: { type: Number },
  disponible: { type: Boolean },
  reg_estatus: { type: Boolean },
  reg_usu_cc: { type: String, default: 'SYSTEM' },
  reg_usu_cu: { type: String, default: 'SYSTEM' },
  reg_usu_fc: { type: Date, default: Date.now },
  reg_usu_fu: { type: Date, default: Date.now }
});

exports.default = mongoose.model('activos', scheme);