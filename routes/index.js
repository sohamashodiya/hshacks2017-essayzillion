var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Student = require("../models/student.js");
var College = require("../models/college.js");
var Essay = require("../models/essay.js");
var CollegeStudent = require("../models/collegeStudent.js");

var scoreNames = [
  'openness',
  'conscientiousness',
  'extraversion',
  'agreeableness',
  'analytical',
  'confidence',
  'tentative',
  'spelling',
  'grammar',
  'wordChoice',
  'structure'
];


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Inside Index");
  req.session.test = 123;
  res.render('index');
});

router.get('/login-s', function(req, res, next) {
  console.log("Inside Login Student");
  res.render('login-s');
});

router.get('/login-c', function(req, res, next) {
  console.log("Inside Login College");
  res.render('login-c');
});

router.get('/addEssay', function(req, res, next) {
  console.log("Inside Add Essay");
  res.render('addEssay', {
    student: req.session.student
  });
});

router.post('/login-s', function(req, res, next) {
  Student.findOne({
    'username': req.body.username
  }, function(err, student) {
    if (err) {
      res.render('index');
    }
    else {
      if (student == null) {
        res.render('index');
      }
      else {
        console.log("student", student);
        req.session.student = student;
        res.redirect('dashboard-s');
      }
    }
  });
});

router.post('/login-c', function(req, res, next) {
  College.findOne({
    'username': req.body.username
  }, function(err, college) {
    if (err) {
      res.render('index');
    }
    else {
      if (college == null) {
        res.render('index');
      }
      else {
        console.log("college", college);
        req.session.college = college;
        res.redirect('dashboard-c');
      }
    }
  });
});

router.get('/dashboard-c', function(req, res, next) {
  var studentEssayList = [];
  var collegeId = req.session.college._id;
  //Find all students that have given access to this college
  CollegeStudent.find({collegeId: mongoose.Types.ObjectId(collegeId)}, function(err, collegeStudentArray) {
    if(err){
      console.log('Error finding CollegeStudent');
      res.render('error');      
    }else{
      //Create a list of studient ids
      var studentIdArray = collegeStudentArray.map(function(cs){
        return mongoose.Types.ObjectId(cs.studentId);
      });
      console.log('List of student ids for this college', studentIdArray);
      Essay.find({
        studentId: {
          "$in": studentIdArray
        }
      }, function(err, studentEssayArray) {
        if (err) {
          console.log('Error finding studentEssayArray', err);
          res.render('error');
        }
        else {
          res.render('dashboard-c', {studentEssayArray: studentEssayArray, college: req.session.college});
        }
      });
    }
      
  });
});

router.get('/register-c', function(req, res, next) {
  console.log("Inside Register College GET");
  res.render('register-c');
});

router.get('/register-s', function(req, res, next) {
  console.log("Inside Register Student GET");
  res.render('register-s');
});

router.post('/register-c', function(req, res, next) {
  console.log("Inside Register College POST");
  var college = new College({
    name: req.body.name,
    officerEmail: req.body.officerEmail,
    username: req.body.username,
    password: req.body.password
  });

  college.save(function(err, college) {
    if (err) {
      res.render('error');
    }
    else {
      res.redirect('/');
    }
  });
});

router.post('/addEssay', function(req, res, next) {
  console.log("Inside Add Essay POST");
  var openness = Math.floor(Math.random() * 51) + 50;
  var conscientiousness = Math.floor(Math.random() * 51) + 50;
  var extraversion = Math.floor(Math.random() * 51) + 50;
  var agreeableness = Math.floor(Math.random() * 51) + 50;
  var analytical = Math.floor(Math.random() * 51) + 50;
  var confidence = Math.floor(Math.random() * 51) + 50;
  var tentative = Math.floor(Math.random() * 51) + 50;
  var spelling = Math.floor(Math.random() * 51) + 50;
  var grammar = Math.floor(Math.random() * 51) + 50;
  var wordChoice = Math.floor(Math.random() * 51) + 50;
  var structure = Math.floor(Math.random() * 51) + 50;
  var isPlagiarized = Math.random() >= 0.5;
  var verified = false;

  var essay = new Essay({
    studentId: req.session.student._id,
    essayText: req.body.essayText,
    openness: openness,
    conscientiousness: conscientiousness,
    extraversion: extraversion,
    agreeableness: agreeableness,
    analytical: analytical,
    confidence: confidence,
    tentative: tentative,
    isPlagiarized: isPlagiarized,
    spelling: spelling,
    grammar: grammar,
    wordChoice: wordChoice,
    structure: structure,
    verified: verified,
    title: req.body.title,
    year: req.body.year,
    author: req.session.student.name
  });

  essay.save(function(err, essay) {
    if (err) {
      res.render('error');
    }
    else {
      res.redirect('dashboard-s');
    }
  });
});

router.post('/api/addEssay', function(req, res, next) {
  var openness = Math.floor(Math.random() * 51) + 50;
  var conscientiousness = Math.floor(Math.random() * 51) + 50;
  var extraversion = Math.floor(Math.random() * 51) + 50;
  var agreeableness = Math.floor(Math.random() * 51) + 50;
  var analytical = Math.floor(Math.random() * 51) + 50;
  var confidence = Math.floor(Math.random() * 51) + 50;
  var tentative = Math.floor(Math.random() * 51) + 50;
  var spelling = Math.floor(Math.random() * 51) + 50;
  var grammar = Math.floor(Math.random() * 51) + 50;
  var wordChoice = Math.floor(Math.random() * 51) + 50;
  var structure = Math.floor(Math.random() * 51) + 50;
  var isPlagiarized = Math.random() >= 0.5;
  var verified = true;

  console.log("Adding Essay for user", req.body.studentId);
  console.log("Essay text is = ", req.body.essayText);
  console.log("Essay author = ", req.body.author);
  var essay = new Essay({
    studentId: mongoose.Types.ObjectId(req.body.studentId),
    essayText: req.body.essayText,
    openness: openness,
    conscientiousness: conscientiousness,
    extraversion: extraversion,
    agreeableness: agreeableness,
    analytical: analytical,
    confidence: confidence,
    tentative: tentative,
    isPlagiarized: isPlagiarized,
    spelling: spelling,
    grammar: grammar,
    wordChoice: wordChoice,
    structure: structure,
    verified: verified,
    title: req.body.title,
    year: req.body.year,
    author: req.body.author
  });

  essay.save(function(err, essay) {
    if (err) {
      res.json({'err': err});
    } else {
      res.json({'msg': 'ADDED'});
    }
  });
});

router.post('/register-s', function(req, res, next) {
  console.log("Inside Register Student");
  var student = new Student({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    schoolName: req.body.schoolName
  });

  student.save(function(err, student) {
    if (err) {
      res.render('error');
    }
    else {
      res.redirect('/');
    }
  });
});

router.get('/dashboard-s', function(req, res, next) {
  console.log('Finding essay with user ID', req.session.student._id);
  Essay.find({
    studentId: req.session.student._id
  }, function(err, essayArray) {
    if (err) {
      res.render('error');
    }
    else {
      console.log("ESSAY ARRAY", essayArray);
      res.render('dashboard-s', {
        student: req.session.student,
        essayArray: essayArray,
        scoreNames: scoreNames
      });
    }
  });
});

router.get('/settings', function(req, res, next) {
  CollegeStudent.find({
    studentId: req.session.student._id
  }, function(err, collegeStudentArray) {
    if (err) {
      res.render('error');
    }
    else {
      console.log("collegeStudentArray", collegeStudentArray);
      var collegeStudentArrayIds = [];
      for (var i = 0; i < collegeStudentArray.length; i++) {
        console.log('Pusing this collegeStudentArray[i].collegeId in array => ', collegeStudentArray[i].collegeId);
        collegeStudentArrayIds.push(mongoose.Types.ObjectId(collegeStudentArray[i].collegeId));
      }
      console.log("collegeStudentArrayIds", collegeStudentArrayIds);
      console.log("collegeStudentArrayIds length", collegeStudentArrayIds.length);
      College.find({
        _id: {
          "$in": collegeStudentArrayIds
        }
      }, function(err, collegeStudentArray) {
        if (err) {
          res.render('error');
        }
        else {
          console.log('collegeStudentArray', collegeStudentArray);
          console.log('collegeStudentArray.length', collegeStudentArray.length);
          College.find({}, function(err, collegeArray) {
            if (err) {
              res.render('error');
            }
            else {
              console.log('collegeArray', collegeArray);
              console.log('collegeArray.length', collegeArray.length);
              res.render('settings', {
                student: req.session.student,
                collegeStudentArray: collegeStudentArray,
                collegeArray: collegeArray
              });
            }
          });
        }
      });

    }
  });
});

//*
router.get('/showEssay/:essayId', function(req, res, next) {
  var essayId = req.params.essayId;
  console.log('Showing essay id', essayId);
  Essay.findById(essayId, function(err, essay){
    if(err){
      console.log('Error getting essay', err);
      res.render('error');      
    }else{
      res.render('essay', {essay: essay, scoreNames: scoreNames, college: req.session.college});
    }   
  });
});

router.get('/removeCollege/:collegeId', function(req, res, next) {
  var collegeId = req.params.collegeId;
  var studentId = req.session.student._id;
  console.log('Removing collegeStudent record: collegeId, studentId => ', collegeId, studentId);
  CollegeStudent.remove({
    collegeId: collegeId,
    studentId: studentId
  }, function(err) {
    if (err) {
      console.log('Error Removing collegeStudent');
      res.render('error');
    }
    else {
      console.log('Success in Removing collegeStudent');
      res.redirect('/settings');
    }
  });
});

router.post('/addCollege', function(req, res, next) {
  console.log("COLLEGE ARRAY, req.body.collegeArray = ", req.body.collegeArray);
  var collegeArray = [];
  //req.body.collegeArray is array if > 1 college is selected
  //Check if req.body.collegeArray is an array
  if (Array.isArray(req.body.collegeArray)) {
    //console.log("req.body.collegeArray IS ARRAY");
    collegeArray = req.body.collegeArray;
  }
  else {
    console.log("req.body.collegeArray IS NOT ARRAY");
    collegeArray = [req.body.collegeArray];
  }
  console.log("COLLEGE ARRAY, collegeArray = ", collegeArray);
  var collegeStudentArray = [];
  for (var i = 0; i < collegeArray.length; i++) {
    var collegeStudent = new CollegeStudent({
      studentId: req.session.student._id,
      collegeId: collegeArray[i]
    });
    collegeStudentArray.push(collegeStudent);
  }

  CollegeStudent.insertMany(collegeStudentArray)
    .then(function(collegeStudentArray) {
      console.log("INSERTED");
      res.redirect('/settings');
    })
    .catch(function(err) {
      if (err) {
        console.log("ERROR IN INSERTING COLLEGE");
        res.render('error');
      }
    });

});

router.get('/removeEssay/:essayId', function(req, res, next) {
  console.log("PARAM",req.params.essayId);
  Essay.findById(req.params.essayId).remove(function(err, essayId){
    if(err){
      res.render('err');
    }else{
      res.redirect('/dashboard-s');
    }
  });  
});

module.exports = router;
