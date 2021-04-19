const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({extended : true}));
app.use(cors());

app.use('/user',require('./routes/UsersApi'));
app.use('/friends',require('./routes/UserFriends'));
app.use('/uploads',require('./routes/UsersPost'));

app.listen(9990,() => { 
    console.log("Server started");
})