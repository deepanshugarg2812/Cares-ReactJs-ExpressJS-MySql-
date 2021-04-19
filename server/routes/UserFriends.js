const route = require('express').Router();
const db = require('../db');

route.post('/allFriends',(req,res) => {
    db.query(`SELECT username FROM Users WHERE user_id IN (SELECT user_id2 FROM Friends WHERE user_id1=${req.body.userId} and areFriends=1);`,(error,response) => {
        if(error==null) {
            if(response.length==0){
                res.send({message: "You have no friends"});
            }
            else{
                res.send({friends : response,friendsCount : response.length,message:"Here are your friends"});
            }
        }
        else{
            res.send({message:"server error"});
        }
    });
});

route.post('/deleteFriend',(req,res) => {
    let username1 = req.body.username1;
    let username2 = req.body.username2;

    db.query(`SELECT user_id FROM Users WHERE username='${username1}'`,(error,response) => {
        if(error==null) {
            if(response.length>0){
                db.query(`SELECT user_id FROM Users WHERE username='${username2}'`,(error1,response1) => {
                    if(error1==null) {
                        if(response1.length>0){
                            db.query(`DELETE FROM Friends WHERE (user_id1=${response[0].user_id} and user_id2=${response1[0].user_id}) or (user_id1=${response1[0].user_id} and user_id2=${response[0].user_id}); `,(error2,response2) => {
                                if(error2==null) {
                                    res.send({message: "You are no longer friends"});
                                }
                                else{
                                    res.send({message:"Server error"});
                                }
                            })
                        }
                        else{
                            res.send({message : "Fake user"})
                        }
                    }
                    else{
                        res.send({message:"Server error"});
                    }
                })
            }
            else{
                res.send({message:"Fake user"});
            }
        }
        else{
            res.send({message:"Server error"});
        }
    })
})

route.post('/findFriends',(req,res) => {
    db.query(`SELECT username FROM Users WHERE user_id NOT IN (SELECT user_id1 FROM Friends WHERE user_id2=${req.body.userId}) and user_id<>${req.body.userId};`,(err,response) => {
        if(err==null) {
            if(response.length==0){
                res.send({message: "Congralutions you have no more friends to add"});
            }
            else{
                res.send({usernames : response,message:"Here are your suggestions"});
            }
        }
        else{
            console.log(err);
            res.send({message:"server error"});
        }
    });
});

//Working
route.post('/sendFriends',(req,res) => {
    let username1 = req.body.username1;
    let username2 = req.body.username2;

    db.query(`SELECT user_id FROM Users WHERE username='${username1}'`,(error,response) => {
        if(error==null) {
            if(response.length>0){
                db.query(`SELECT user_id FROM Users WHERE username='${username2}'`,(error1,response1) => {
                    if(error1==null) {
                        if(response1.length>0){
                            db.query(`INSERT INTO Friends (user_id1,user_id2,areFriends) VALUES (${response[0].user_id},${response1[0].user_id},${0}); `,(error2,response2) => {
                                if(error2==null) {
                                    res.send({message: "Friend request send"});
                                }
                                else{
                                    res.send({message:"Server error"});
                                }
                            })
                        }
                        else{
                            res.send({message : "Fake user"})
                        }
                    }
                    else{
                        res.send({message:"Server error"});
                    }
                })
            }
            else{
                res.send({message:"Fake user"});
            }
        }
        else{
            res.send({message:"Server error"});
        }
    })
});

route.post('/acceptRequest',(req,res) => {
    let username1 = req.body.username1;
    let username2 = req.body.username2;

    db.query(`SELECT user_id FROM Users WHERE username='${username1}'`,(error,response) => {
        if(error==null) {
            if(response.length>0){
                db.query(`SELECT user_id FROM Users WHERE username='${username2}'`,(error1,response1) => {
                    if(error1==null) {
                        if(response1.length>0){
                            db.query(`UPDATE Friends SET areFriends=1 where (user_id1=${response[0].user_id} and user_id2=${response1[0].user_id}) or (user_id1=${response1[0].user_id} and user_id2=${response[0].user_id});`,(error2,response2) => {
                                if(error2==null){
                                    db.query(`INSERT INTO Friends (user_id1,user_id2,areFriends) VALUES (${response[0].user_id},${response1[0].user_id},${1}); `,(error3,response3) => {
                                        if(error2==null) {
                                            res.send({message : "You are now friends"});
                                        }
                                        else{
                                            res.send({message:"Server error"});
                                        }
                                    })
                                }
                                else{
                                    res.send({message : "Error"})
                                }
                            })
                        }
                        else{
                            res.send({message : "Fake user"})
                        }
                    }
                    else{
                        res.send({message:"Server error"});
                    }
                })
            }
            else{
                res.send({message:"Fake user"});
            }
        }
        else{
            res.send({message:"Server error"});
        }
    });
});

route.post('/pendingRequest',(req,res) => {
    db.query(`SELECT username FROM SocialConnect.Users WHERE user_id in (SELECT user_id1 FROM SocialConnect.Friends Where user_id2=${req.body.userId} and areFriends=0) and user_id<>${req.body.userId};`,(error,response) => {
        if(error==null){
            res.send({requests : response});
        }
        else{
            res.send("Server Error");
        }
    })
})

exports = module.exports = route;