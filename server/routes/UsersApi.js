const route = require('express').Router();
const db = require('../db');

route.post('/',(req,res) => {
    db.query(`SELECT user_id,username FROM Users WHERE username='${req.body.username}' and password='${req.body.password}';`,(error,response) => {
        if(error==null) {
            if(response.length==0){
                res.send({userId : undefined , message: "Enter correct username and password"});
            }
            else{
                res.send({userId : response[0].user_id, username : response[0].username , message:"Success"});
            }
        }
        else{
            res.send({userId : undefined , message:"server error"});
        }
    })
});

route.post('/signup',(req,res) => {
    db.query(`SELECT username FROM Users WHERE username='${req.body.username}';`,(error,response) => {
        if(error==null) {
            if(response.length==0){
                db.query(`Insert INTO Users (username,password) VALUES ('${req.body.username}','${req.body.password}');`,(error1,response1) => {
                    if(error1==null){
                        res.send({accountMade:true,message:"User successfully created"});
                    }
                    else{
                        res.send({message:"Server error"});
                    }
                })
            }
            else{
                res.send({message : "User already exists"});
            }
        }
        else{
            res.send({userId : undefined , message:"server error"});
        }
    })
})

exports = module.exports = route;