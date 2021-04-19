const mysql = require('mysql');

const db = mysql.createConnection({
    host : "localhost", 
    database : "SocialConnect",
    password : "root",
    user : "root"
});

exports = module.exports = db;