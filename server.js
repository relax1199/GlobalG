var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var cookieParser = require('cookie-parser');
var fs = require('fs');
var path = require('path');
var db = require('./db');
// var passport = require('./autuh');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
var session = require('express-session');

app.use(express.static(__dirname));
app.use (bodyParser.urlencoded ({
   	extended: true,
	limit: '50mb'
}));

app.use (bodyParser.json ({
   	extended: true,
	limit: '50mb'
}));
app.use(cookieParser());
app.use(session({
	secret:'da illest developer',
	resave:true,
	saveUnitialized:true
}));
// app.use(passport.initialize());
// app.use(passport.session());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var data = require('./controllers/data');

function checkAdmin(req,res,next){
    console.log(req.cookies.login);
    db.get().collection('admin').find().toArray(function(err,result){
        console.log(req.cookies);
        if(req.cookies.login == result[0].login  && req.cookies.password == result[0].password){
            next();	
        }
        else{
            res.redirect('/login')
        }
    })
}

app.get('/',function(req,res){
	res.render('index.ejs',{});
});

app.get('/news',data.getNews);

app.get('/updates',data.getUpdates);

app.get('/admin',checkAdmin,data.getData);

app.post('/addNews',checkAdmin,data.addNews);

app.post('/addUpdate',checkAdmin,data.addUpdate);

app.post('/newsDelete',checkAdmin,data.newsDelete);

app.post('/updateDelete',checkAdmin,data.updateDelete);

app.post('/getUpdate',checkAdmin,data.getUpdateId);

app.post('/getNews',checkAdmin,data.getNewsId);

app.post('/updateNews',checkAdmin,data.updateNews);

app.post('/updateUpdate',checkAdmin,data.updateUpdate);

app.post('/login',data.login);

app.get('/login',function(req,res){
	res.render('login.ejs',{});
})

app.get('/admin',function(req,res){
	res.render('admin.ejs',{});
})

db.connect('mongodb://localhost:27017/GlobalG',function(err){
	if(err){
		return console.log(err);
	}
	app.listen(8000,function(){
		console.log("server started");
	})
});

