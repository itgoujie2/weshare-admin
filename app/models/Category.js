var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');

var CategorySchema = new Schema({
	title : String,
	img: {type: String, default: 'some default image'},
	description : String,
	order : Number,
	createdOn : {type: Date, index: true, default: Date.now}
});

CategorySchema.index({'order': 1});

module.exports = mongoose.model('Category', CategorySchema);