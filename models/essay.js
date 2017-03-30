'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Essay = new Schema({
    studentId: {type: Schema.Types.ObjectId, ref: 'Student'},
    author: String,
    essayText: String,
    openness: Number,
    conscientiousness: Number,
    extraversion: Number,
    agreeableness: Number,
    analytical: Number,
    confidence: Number,
    tentative: Number,
    spelling: Number,
    grammar: Number, 
    wordChoice: Number,
    structure: Number,
    isPlagiarized: Boolean,
    verified: Boolean,
    title: String,
    year: Number
});

Essay.methods.getUser = function(cb) {
  return this.model('Student').findById(this.studentId, cb);
};

module.exports = mongoose.model('Essay', Essay);