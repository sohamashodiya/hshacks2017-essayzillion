'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var College = new Schema({
    name: String,
    officerEmail: String,
    username: String,
    password: String
});

module.exports = mongoose.model('College', College);