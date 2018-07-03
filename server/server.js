require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// POST Request
// send json to my express app.
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

// GET Request
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

// getting an individual route (resourse) - GET/todos/:id
// URL direction : ":id"; si folosesti req nu res ca in celelalte cazuri.
// valid id using isValid
// 404 - send back an empty body
// find by id
  // success
    // if todo - send it back
    // if no todo - send back 404 with empty body
    // error
    // 400 - and send empty body back
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

// DELETE Request
// delete a todo object.
  // get the id
  // validate the id -> not valid? return 404
  // remove todo by id
    // success
      // if no doc, send 404
      // if doc, send doc back with 200
    // error
      // 400 with empty body

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

// PATCH - use to update tod items
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  // use lodash: pick
  //body has a subset of things that users passed to us. We don't want the user to be able to update anything they choose.
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  //update the completedAt property based of the completed property

  // checking the completed value and using that value to set completedAt.
  // If a user is setting a todo's completed property to TRUE, we want to set completed that to a time stamp.
  // If they're setting it to FALSE we want to clear that time stamp because that won't be completed.
  // getTime() return a JS time stamp.
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  //We make our call to find by id and update with these three steps we are able to successfully update our todos when we make the patch call.
  //new (din mongoose) similar cu returnOriginal (mongoDB)
   Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
     if (!todo) {
       return res.status(404).send();
     }

     res.send({todo});
   }).catch((e) => {
     res.status(400).send();
   });
});

// POST /users
// Model method
// It's going to take that JWT token that the user sends in one of their secure requests, vom gasi userul si vom returna that user to the caller.
// User.findByToken()

// Instance method are called on an individual user like generateAuthToken method
// generateAuthToken = responsabila pentru adaugarea unui token pentru un user individual, pentru salvarea si returnarea tokenului pe care il vom trimite inapoi la user.
// user.generateAuthToken()
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    // call and return generateAuthToken()
    return user.generateAuthToken();
  }).then((token) => {
    // when you prefix a header with "X-" you are creating a custom header which means it's not necessarily a header that HTTP supports by default. It's a gheader thtat you'reusing for our specific purposes in out application
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

//private route
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});


// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

// verify if user exist with that email and generate a new token
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}.`);
});

module.exports = {app};
