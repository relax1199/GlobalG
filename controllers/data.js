var data = require('../models/data');
var fs = require('fs');

exports.addNews = function(req,res){
    var news = {
        title:req.body.newsTitle,
        content:req.body.newsContent,
        time:req.body.newsTime,
        img:req.body.fileName
    }
    fileSave(req.body.data,news.img);
    data.addNews(news,function(err,result){
        if(!err)
            return  res.sendStatus(200);
        res.sendStatus(500);
    })
}

exports.login = function(req,res){
    var user = {
        login:req.body.login,
        password:req.body.password
    }
    console.log(user);
    data.login(user,function(err,result){
        if(result!=""){
            res.cookie("login",result[0].login);
            res.cookie("password",result[0].password);
            res.send({success:true}).end();
        }
        else{
            res.send({success:false}).end();
        }
    })
}

exports.addUpdate = function(req,res){
    var update = {
        title:req.body.updateTitle,
        content:req.body.updateContent,
        time:req.body.updateTime,
    }
    data.addUpdate(update,function(err,result){
        if(!err)
            return  res.sendStatus(200);
        res.sendStatus(500);
    })
}

exports.getData = function(req,res){
    data.getData(function(err,result){
        if(result!="")
            return res.render('adminpage1.ejs',{result:result});
        res.render('adminpage1.ejs',{result:{result}});
    });
}

exports.newsDelete = function(req,res){
    data.newsDelete(req.body.id,function(err,result){
        if(!err)
            return res.sendStatus(200)
        res.sendStatus(500);
    })
}

exports.updateDelete = function(req,res){
    data.updateDelete(req.body.id,function(err,result){
        if(!err)
            return res.sendStatus(200)
        res.sendStatus(500);
    })
}


exports.getUpdateId = function(req,res){
    data.getUpdateId(req.body.id,function(err,result){
        if(result!="")
            return res.send(result)
        res.send(err);
    })
}

exports.getNewsId = function(req,res){
    data.getNewsId(req.body.id,function(err,result){
        if(result!="")
            return res.send(result)
        res.send(err);
    })
}

exports.getNews = function(req,res){
    data.getNews(req.body.id,function(err,result){
        if(result!="")
            return res.render('news.ejs',{result:result});
            res.render('news.ejs',{result:{}});
    })
}

exports.getUpdates = function(req,res){
    data.getUpdates(req.body.id,function(err,result){
        if(result!="")
            return res.render('updates.ejs',{result:result});
            res.render('updates.ejs',{result:{}});
    })
}

exports.updateNews = function(req,res){
    var news = {
        title:req.body.title,
        content:req.body.content,
        time:req.body.time,
        id:req.body.id,
        img:req.body.fileName
    }
    data.updateNews(news,function(err,result){
        if(result!="")
            return res.sendStatus(200)
        res.sendStatus(500);
    })
}

exports.updateUpdate = function(req,res){
    var update = {
        title:req.body.title,
        content:req.body.content,
        time:req.body.time,
        id:req.body.id,
        img:req.body.fileName
    }
    data.updateUpdate(update,function(err,result){
        if(result!="")
            return res.sendStatus(200)
        res.sendStatus(500);
    })
}


function fileSave(file,name){
    var b64Data = file.split(',')[1];
	var buffer = new Buffer(b64Data,'base64');
	fs.writeFile('./img/'+name,buffer,function(e){
		if(e) console.log.error(e);
    });
}