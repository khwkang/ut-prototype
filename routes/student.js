var express = require('express');
var router = express.Router();
var enrolledRoute = require('class_students');

var Student  = require('./../app/models/student');
var Instructor  = require('./../app/models/instructor');
var passport = require('passport');
var path         = require('path');
var DBQuery = require('../utils/dbQueries.js')

router.use('/:username/', )

router.get('/', function(req, res) {
  // query 'students' table with username and return first and last name, and all ranks for all classes

	// DBQuery.getStudentUsing('username', req.username, function(data){
	//   	res.json(data);
	// });
});