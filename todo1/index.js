const express = require('express');//set up the server express
const path =require('path'); //require to make view folder
const port = 4000;
const app = express();

const db =require('./config/mongoose');
const todo =require('./model/todoSchema');


app.set('view engine', 'ejs'); //set up the views templates
app.set('views','./views');

app.use(express.urlencoded()); //body parser it reads data and kept data in key value pair
app.use(express.static('asset'));

const todoList = [
    {
        description:"for study",
        category:"work",
        time:"21-08-2023"
    }
]

app.get('/', async function(req,res){
    try{
        const todoList = await todo.find({});
        return res.render('home',{
            title:"TODO",
            todo:todoList
        });
    } catch(err){
        console.log("error in fetching contacts from the db");
        return;
    }
});



app.post('/create-to-do', async function(req, res) {
    try {
        const newTodo = await todo.create({
            description: req.body.description,
            category: req.body.category,
            time: req.body.date
        });
        console.log('**********', newTodo);
        return res.redirect('/');
    } catch (err) {
        console.log("error", err);
        return;
    }
});


app.get('/delete-todo', async function(req, res) {
    try {
        const id = req.query.id;
        await todo.findByIdAndDelete(id);
        return res.redirect('/');
    } catch (err) {
        console.log("error in deletion from database", err);
        return;
    }
});





app.listen(port,function(err){
    if(err){
        console.log("error in running the server",err);
        return;
    }
    console.log("server is running !! Awesome");
});