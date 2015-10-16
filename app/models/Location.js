var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
	countries : Schema.Types.Mixed
});

module.exports = mongoose.model('Location', LocationSchema);