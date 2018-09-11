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
app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET Request
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
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
app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
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

app.delete('/todos/:id', authenticate, async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
 try {
   const todo = await Todo.findOneAndRemove({
     _id: id,
     _creator: req.user._id
   });
   if (!todo) {
     return res.status(404).send();
   }

    res.send({todo});
 } catch (e) {
   res.status(400).send();
 }
});

// PATCH - use to update tod items
app.patch('/todos/:id', authenticate, (req, res) => {
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
  Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
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
app.post('/users', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//private route
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

// delete an token for an user that logout using a private route
app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});

app.listen(port, () => {
  console.log(`Started up at port ${port}.`);
});

module.exports = {app};
