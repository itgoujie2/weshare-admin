var Weshare = require('./models/Weshare');
var User = require('./models/User');
var Category = require('./models/Category');
var q = require('q');
var winston = require('winston');
var moment = require('moment');


function getCategories(req, res, next){
	var query = Category.find().sort({order: 1});
	query.exec(function(err, categories){
		if (err) return next(err);
		return  res.send(JSON.stringify(categories));
	});
}

exports.getCategories = getCategories;