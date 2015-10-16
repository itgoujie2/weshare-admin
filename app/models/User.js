var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Weshare = require('./User');

var UserSchema = new Schema({
	email : {type: String, unique: true},
	nickname : String,
	password : String,
	token : String,
	likes: {
		// weshareId: {type: [Schema.Types.ObjectId], default: []}
		weshareId: [{type: [Schema.Types.ObjectId], ref: 'Weshare'}]
	},
	createdOn : {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);