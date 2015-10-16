var Location = require('./models/Location');


function getLocation(req, res, next){

	Location.find().exec(function(err, data){
		return res.send(JSON.stringify(data));
	});

}
exports.getLocation = getLocation;