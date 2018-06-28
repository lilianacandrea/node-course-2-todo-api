const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

// findOneAndUpdate: face update unui document si ni-l returneaza pe cel nou.
// findOneAndUpdate(filter, update, options, callback)
//The $set operator replaces the value of a field with the specified value.

// db.collection('Todos').findOneAndUpdate({
//   _id: new ObjectID('5b349ddfab6d3261e63b1758')
// }, {
//   $set:{
//     name: 'fomitza'
//   }
// }, {
//   returnOriginal: false
// }).then((result) => {
//   console.log(result);
// });

//Challenge: change the name property and increment the age property by 1.
// db.collection('Users').findOneAndUpdate({
//   _id: new ObjectID('5b33a63a8b26c999ec8d8414')
// }, {
//   $set: {
//     name: 'Snitzi'
//   }
// }, {
//   returnOriginal: false
// }).then((result) =>{
//   console.log(JSON.stringify(result, undefined, 2));
// });

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID('5b34aa9cab6d3261e63b1a7e')
}, {
  $inc: {
    age: 1,
  }
}, {
  returnOriginal: false
}).then((result) =>{
  console.log(JSON.stringify(result, undefined, 2));
});
  // client.close();
});
