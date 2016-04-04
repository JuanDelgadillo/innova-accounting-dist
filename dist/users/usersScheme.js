'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  email: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  privilege: { type: Number },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
});

exports.default = mongoose.model('users', usersSchema);