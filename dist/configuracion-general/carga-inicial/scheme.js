'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Empresas
var schema = new Schema({
  padre_id: { type: String, default: '' },
  empresa_id: { type: String, default: '' },
  tipoMoneda: { type: String, enum: ['Bolivar', 'Dolar', 'Euro', 'Peso Argentino', 'Peso Colombiano'] },
  logotipoAEmpresa: { type: String, default: '' },
  descripcion: { type: String, default: '' },
  impuesto: { type: Number, default: '12' }
});

exports.default = mongoose.model('carga_inicial_empresas', schema);