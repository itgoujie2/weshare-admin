var express = require('express');
var app = new express();
var mongoose = require('mongoose');
var db = require('./config/db');
var cors = require('cors');
var bodyParser = require('body-parser');
var weshare = require('./app/weshare');
var category = require('./app/category');
var location = require('./app/location');
var port = process.env.PORT || 4000;

mongoose.connect(db.url);

mongoose.connection.on('open', function(ref){
	console.log('connected: ' + ref);
})


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

process.on('uncaughtException', function(err){
	console.log(err);
})

app.get('/categories', category.getCategories);

app.post('/weshares/create', weshare.create);
app.get('/weshares', weshare.getAll);
app.get('/weshares/withConditions', weshare.getAllWithConditions);
app.get('/weshares/:weshareId', weshare.getById);

app.get('/userWeshare', weshare.getUserWeshare);

app.delete('/delete/:weshareId', weshare.deleteWeshare);

app.put('/update', weshare.updateWeshare);

app.get('/location', location.getLocation);

app.listen(port, function(){
	console.log('listening on ' + port);
})