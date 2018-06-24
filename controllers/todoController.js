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
var itemOne = Todo({item: 'go to sleep'}).save(function(err){
  if (err) throw err;
  console.log('item saved');
});

var data=[{item: 'brush your teeth'}, {item: 'clean the house'}, {item: 'go to study'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

  app.get('/todo', function(req, res) {
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    data.push(req.body);
    res.json(data);
  });

  app.delete('/todo/:item', function(req, res) {
    data=data.filter(function(todo) {
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
  });

}
