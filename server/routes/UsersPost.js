const route = require('express').Router();
const db = require('../db');

route.post('/',(req,res) => {
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const user_id = parseInt(req.body.user_id);
    const username = req.body.username;
    
    db.query(
      "INSERT INTO Uploads (title, description, image, user_id,username) VALUES (?, ?, ?, ?,?);",
      [title, description, image, user_id,username],
      (err, results) => {
        if(err==null){
            res.send("Success");
        }
        else{
            console.log(err);
            res.send(err);
        }
      }
    );
});

route.post('/getFriendsPost',(req,res) => {
    const user_id = parseInt(req.body.userId);
    db.query("SELECT * FROM Uploads WHERE user_id IN (SELECT user_id2 FROM Friends WHERE user_id1=? and areFriends=1);",[user_id],(error,response) => {
        if(error==null){
            if(response.length>0){
                res.send({post : response});
            }
            else{
                res.send({message : "No post to see"});
            }
        }
        else{
            res.send({message : "Server error"});
        }
    })
});

route.post('/viewMyPost',(req,res) => {
    const user_id = parseInt(req.body.userId);
    db.query("SELECT * FROM Uploads WHERE user_id=?",[user_id],(error,response) => {
        if(error==null){
            if(response.length>0){
                res.send({post : response});
            }
            else{
                res.send({message : "No post to see"});
            }
        }
        else{
            res.send({message : "Server error"});
        }
    })
})

route.post('/DeleteMyPost', function(req, res){
    const user_id = parseInt(req.body.userId);
    const postId = parseInt(req.body.postId);
    db.query("DELETE FROM Uploads Where user_id=? and id=?",[user_id,postId],(error,response) => {
        if(error==null){
            res.send({message : "Deleted"});
        }
        else{
            res.send({message : "Server error"});
        }
    })
})

exports = module.exports = route;