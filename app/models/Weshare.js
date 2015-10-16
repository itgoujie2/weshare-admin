var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');
var Category = require('./Category');

var WeshareSchema = new Schema({
	images : {type: Array, default: []},
	title : String,
	wechatId : {type: String},
	description : String,
	category : {type: [Schema.Types.ObjectId], ref: 'Category'},
	state: Schema.Types.Mixed,
	country: Schema.Types.Mixed,
	top: {type: Boolean, default: false},
	report: {type: Number, default: 0},
	creator : {type: [Schema.Types.ObjectId], ref: 'User'},
	likes: {
		num: {type: Number, default: 0},
		users: [{type: [Schema.Types.ObjectId], ref: 'User'}]
		// users: {type: [Schema.Types.ObjectId], default: []}
	},
	createdOn : {type: Date, index: true, default: Date.now}
});

WeshareSchema.index({'createdOn': 1});

module.exports = mongoose.model('Weshare', WeshareSchema);