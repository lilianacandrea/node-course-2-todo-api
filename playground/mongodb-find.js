//FETCHING DATA
//__________________________________
//FIND = is the method that we are going to use to query that database.
// Find return a mongoDB cursor, this cursor is not the actual documents themselves (pentru ca pot fi mii si poate fi ineficient).
// ==> este defapt un pointer catre documentele respective, iar cursorul sunt diferitele metode pe care le putem folosi pentru a prelua documentele noastre.
// toArray= in loc sa afiseze un cursor, afiseaza documentele intr-un array
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

// va returna o Promise using then
//   db.collection('Todos').find(
//     {
//     //_id: '5b33a5351674be8820cb6f7d' nu va fuctiona cum trebuie pentru ca _id este un objectId si trebuie instantiat ca mai jos
//     _id: new ObjectID('5b33b693a4188d7dd9c1f7d5')
//   }
// ).toArray().then((docs) => {
//     console.log('Todos');
//     console.log(JSON.stringify(docs, undefined, 2));
//   }, (err) => {
//     console.log('Unable to fetch data', err);
//   });

//using count!!
// db.collection('Todos').find().count().then((count) => {
//   console.log(`Todos count: ${count}`);
// }, (err) => {
//   console.log('Unable to fetch data', err);
// });

db.collection('Users').find({name: 'Mitz'}).count().then((count) => {
  console.log(`Users with name Mitz are: ${count}`);
}, (err) => {
  console.log('Unable to fetch data', err);
});

db.collection('Users').find({name: 'Mitz'}).toArray().then((docs) => {
  console.log(JSON.stringify(docs, undefined, 2));
}, (err) => {
  console.log('Unable to fetch data', err);
});
  // client.close();
});
