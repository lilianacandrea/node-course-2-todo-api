var express = require('express');
var bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//POST Request
//send json to my express app.
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET Request
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

//getting an individual route (resourse) - GET/todos/:id
//URL direction : ":id"; si folosesti req nu res ca in celelalte cazuri.
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

//valid id using isValid
//404 - send back an empty body
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

//find by id
  //success
    //if todo - sned it back
    //if no todo - send back 404 with empty body
  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});
//error
//400 -and send empty body back
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}.`);
});

module.exports = {app};
