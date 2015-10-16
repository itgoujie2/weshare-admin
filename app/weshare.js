var Weshare = require('./models/Weshare');
var User = require('./models/User');
var q = require('q');
var winston = require('winston');
var moment = require('moment');

function create(req, res, next){
	winston.info('create weshare');
	var weshare = req.body;
	winston.info(weshare);

	var weshareModel = new Weshare({
			images : weshare.images,
			title : weshare.title,
			wechatId : weshare.wechatId,
			description : weshare.description,
			category : weshare.category,
			state : weshare.state,
			country : weshare.country,
			creator : weshare.creator
		}).save(function(err, result){
			console.log('err: ' + err);
			console.log('result: ' + result);
			if (err) return next(err);
			if (result) return res.send(JSON.stringify(result, null, 4));
		});
	
}

function updateWeshare(req, res, next){
	var weshare = req.body;

	Weshare.findOne({_id: weshare.id}, function(err, data){
		data.images = weshare.images;
		data.title = weshare.title;
		data.wechatId = weshare.wechatId;
		data.description = weshare.description;
		data.category = weshare.category;
		data.state = weshare.state;
		data.country = weshare.country;

		data.save(function(err, result){
			if (err) return next(err);
			if (result) return res.send(JSON.stringify(result));
		});
	})
}

// without category
function getAll(req, res, next){
	var categoryId = req.query.categoryId;
	var stateFilter = req.query.stateFilter;

	var query;
	if (typeof stateFilter === 'undefined' || stateFilter == ''){
		query = (typeof category !== 'undefined' && category !== '') ? Weshare.find({category: categoryId}) : Weshare.find()
		.sort({createdOn: -1})
	}
	else{
		query = (typeof category !== 'undefined' && category !== '') ? 
			Weshare.find({$and: [{category: categoryId}, {'state.value': stateFilter}]}) : 
			Weshare.find({'state.value': stateFilter})
		.sort({createdOn: -1})
	}
	query.exec(function(err, weshares){
		if (err) return next(err);
		return res.send(JSON.stringify(weshares));
	})
}

// with conditions
function getAllWithConditions(req, res, next){
	//category, country, state
	var category = req.query.category;
	var country = req.query.country;
	var state = req.query.state;

	winston.info('country: ' + country);
	winston.info('state: ' + state);

	var query = {};
	if (typeof category !== 'undefined' && category !== 'invalid'){
		query['category'] = category;
	}
	// if (typeof country !== 'undefined'){
	// 	query['country'] = country;
	// }
	if (typeof state !== 'undefined' && state !== 'invalid'){
		query['state.value'] = state;
	}

	winston.info('query: ' + JSON.stringify(query, null, 4));

	if (typeof query !== 'undefined' && query != null && !isEmpty(query)){
		console.log('calling');

		Weshare.find(query)
			.sort({createdOn: -1})
			.exec(function(err, weshares){
				if (err) return next(err);
				return res.send(JSON.stringify(weshares));
			})	
	}
	else{
		return res.send([]);
	}
	
}


function getById(req, res, next){
	var id = req.params.weshareId;
	winston.info('id: ' + id);
	Weshare.findOne({_id: id}, function(err, result){
		if (err) return next(err);
		if (result) return res.send(JSON.stringify(result));
	});
}

function deleteWeshare(req, res, next){
	var weshareId = req.params.weshareId;
	winston.info('weshareId in delete: ' + weshareId);

	Weshare.remove({_id: weshareId}, function(err){
		if (err) return next(err);
		return res.sendStatus(200);
	})

}


function getUserWeshare(req, res, next){
	var userId = req.query.userId;

	winston.info('userId in profile: ' + userId);

	var query = Weshare.find({creator: userId})
	.sort({createdOn: -1});

	query.exec(function(err, results){
		if (err) return next(err);
		res.send(JSON.stringify(results));
	});
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

exports.create = create;
exports.getAll = getAll;
exports.getAllWithConditions = getAllWithConditions;
exports.getById = getById;
exports.getUserWeshare = getUserWeshare;
exports.deleteWeshare = deleteWeshare;
exports.updateWeshare = updateWeshare;