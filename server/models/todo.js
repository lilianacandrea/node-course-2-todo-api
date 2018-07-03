var mongoose = require('mongoose');
// create a model to organize the data more specific. (specify the atributes we wants to have)
    //2 args: string name and an object
//trim elimina spatierile lasand un empty string
//mongoose cast the numbers into strings (and boolean)
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

//Challenge
// var otherTodo = new Todo({
//   text: 'Something to do',
//   // completed: true,
//   // completedAt: 123
// });

////Save este responsabil de salvarea datelor in MongoDB, iar save returneaza a promise
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//   console.log('Unable to save todo', err);
// });

module.exports = {Todo};
