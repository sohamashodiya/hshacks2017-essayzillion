'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollegeStudent = new Schema({
    studentId: {type: Schema.Types.ObjectId, ref: 'Student'},
    collegeId: {type: Schema.Types.ObjectId, ref: 'College'}
});

module.exports = mongoose.model('CollegeStudent', CollegeStudent);