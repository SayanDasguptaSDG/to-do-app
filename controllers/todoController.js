var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://sayan:sayan123@ds117111.mlab.com:17111/to-do-list');

//create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

//create a model
var Todo = mongoose.model('Todo', todoSchema);

//var data=[{item: 'brush your teeth'}, {item: 'clean the house'}, {item: 'go to study'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

  app.get('/todo', function(req, res) {
    //get data from the mongo db and pass it to the view
    Todo.find({}, function(err, data) {
      if (err)  throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    //get data from the view and add it to mongo db
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err)  throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res) {
    //delete the item from mongo db
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
      if (err)  throw err;
      res.json(data);
    });
  });

}
