var express = require("express");
var router = express.Router();
//var mongojs = require("mongojs");
//var db = mongojs(
//    "MEANStackDB",
//    ["tasks"],
    
//);
const mongoose = require('mongoose');

const Task = mongoose.model('Task');
const User = mongoose.model('User');
//let mail = user.email;
//let mail = this.state.email;


module.exports.get =(req,res,next) => {
    console.log('Get')
    Task.find({/* Mail : mail */},{_id : 1,title :1}, (err,tasks) => {
        if(err){
            res.send(err);
        }

        var data = [];
        Object.keys(tasks).forEach((key)=>{
            var val = tasks[key];
            data.push([val.title,val._id]);
        });
        res.send(data);
    });
};


module.exports.post = (req,res,next) => {
    console.log("c");
    var task = new Task();
    //task.Mail = mail;
    task.title = req.body.title;
    console.log("task");
    if(!task.title){
        res.status(400);
        res.json({
            error:"Bad data"
        });
    }else{
        task.save(task,(err,task)=>{
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
};


module.exports.delete = (req,res,next)=>{
     console.log("Delete")
     Task.deleteOne({_id:(req.params.id)},(err,task) =>{
         if(err){
             res.send(err);
         }
         res.json(task);
     });
};


module.exports.put = (req,res,next)=>{
     var task = req.body;
     var updTask = {};

     if(task.title){
         updTask.title=task.title;
     }

     if(!updTask){
         res.status(400);
         res.json({
             error:"Bad data"
         });
     }else{
         Task.updateOne({_id:(req.params.id)},
         updTask,
         {},
         (err,task)=>{
             if(err){
                 res.send(err);
             }
             res.json(task);
         });
     }
};


// module.exports = router;