var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.addNews = function(news,cb){
    db.get().collection('news').insert({
        title:news.title,
        content:news.content,
        time:news.time,
        img:news.img
    },function(err,res){
        cb(err,res);
    })
}


exports.addUpdate = function(update,cb){
    db.get().collection('update').insert({
        title:update.title,
        content:update.content,
        time:update.time
    },function(err,res){
        cb(err,res);
    })
}


exports.getData = function(cb){
    db.get().collection('news').find().toArray(function(err,doc){
        db.get().collection('update').find().toArray(function(err2,doc2){
            var result = {
                news:doc,
                update:doc2
            }
            cb(err2,result);
        })
    })
}

exports.getUpdateId = function(id,cb){
    db.get().collection('update').find({_id:ObjectID(id)}).toArray(function(err,res){
        cb(err,res);
    })
}


exports.getNewsId = function(id,cb){
    db.get().collection('news').find({_id:ObjectID(id)}).toArray(function(err,res){
        cb(err,res);
    })
}

exports.getNews = function(id,cb){
    db.get().collection('news').find().sort({natural:-1}).toArray(function(err,res){
        cb(err,res);
    })
}

exports.getUpdates = function(id,cb){
    db.get().collection('update').find().sort({natural:-1}).toArray(function(err,res){
        cb(err,res);
    })
}

exports.updateDelete = function(id,cb){
    db.get().collection('update').remove({
        _id:ObjectID(id)
    },function(err,res){
        cb(err,res);
    })
}

exports.newsDelete = function(id,cb){
    db.get().collection('news').remove({
        _id:ObjectID(id)
    },function(err,res){
        cb(err,res);
    })
}

exports.updateNews = function(news,cb){
    db.get().collection('news').update({_id:ObjectID(news.id)},{$set:{
        title:news.title,
        content:news.content,
        time:news.time,
        img:news.img
    }},function(err,result){
        cb(err,result)
    })
}

exports.login = function(user,cb){
    db.get().collection('admin').find({login:user.login,password:user.password}).toArray(function(err,res){
        cb(err,res);
    })
}

exports.updateUpdate = function(update,cb){
    db.get().collection('update').update({_id:ObjectID(update.id)},{$set:{
        title:update.title,
        content:update.content,
        time:update.time,
        img:update.img
    }},function(err,result){
        cb(err,result)
    })
}