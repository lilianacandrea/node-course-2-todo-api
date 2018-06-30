const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Remove everything from DB
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// will delete (match) the first document. (Metoda asta returneaza si obiectul care a fost sters)
// Todo.findOneAndRemove({_id: '5b378131abdf53276d577c94'}).then((todo) => {});

Todo.findByIdAndRemove('5b378131abdf53276d577c94').then((todo) => {
  console.log(todo);
});
