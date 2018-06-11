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

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect("/login");
    }
}

app.get('/',function(req,res){
	res.render('index.ejs',{});
});

app.get('/news',data.getNews);

app.get('/updates',data.getUpdates);

app.get('/admin',data.getData);

app.post('/addNews',data.addNews);

app.post('/addUpdate',data.addUpdate);

app.post('/newsDelete',data.newsDelete);

app.post('/updateDelete',data.updateDelete);

app.post('/getUpdate',data.getUpdateId);

app.post('/getNews',data.getNewsId);

app.post('/updateNews',data.updateNews);

app.post('/updateUpdate',data.updateUpdate);



// app.post('/addNews',function(req,res){
// 	console.log(req.body.newsTime)
// });

// app.post('/login',passport.authenticate('local', { failureRedirect: '/login' }),function(req,res){
// 	res.redirect('/');
// });

// app.post('/logout',function(req,res){
// 	if(req.isAuthenticated()){
// 		req.logout();
// 		res.sendStatus(200);
// 	}
// })

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
	app.listen(9000,function(){
		console.log("server started");
	})
});

