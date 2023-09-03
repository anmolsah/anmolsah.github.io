const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/todo_db');
 const db =mongoose.connection;

 db.on('error', function(err){
    console.log("error in connecting to the db");
 });

 db.once('open',function(err){
    console.log("database succesfully connected");
 });