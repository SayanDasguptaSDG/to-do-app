var express = require('express');
var todoController = require('./controllers/todoController');

var app=express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fires controllers
todoController(app);

//listen to port
app.listen(3500);
console.log('You are listening to port 3500');
