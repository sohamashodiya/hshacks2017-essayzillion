'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Student = new Schema({
   schoolName: String,
   name: String,
   username: String,
   email: String
});

module.exports = mongoose.model('Student', Student);