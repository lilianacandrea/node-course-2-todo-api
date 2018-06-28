//loading a library (mongodb) and connecting to the DB
//__________________________________
//mongo client: folosit pentru conexiunea la mongo server si iti permite sa manipulezi DB.
//Connect ia 2 args: 1: un string care este un URL (in cazul meu: localhost)
                      //  2: a callback function care va face fire dupa conexiunea care a reusit sau nu
//__________________________________
//colletion: ia un singur argument, si anume numele colectiei in care vrem sa introducem date
//insertOne: permite sa inserezi un nou document (new row in SQL) in mt collection
  //2 args: 1- un obiect - contine perechi key-value de date cu ce vrem sa introducem in DB
            //2- a callback function- will get fire when things faild or go well
//__________________________________
//.OPS atribute va stoca toate datele care au fost inserate
//filter function: undefined
// indentation: 2
//__________________________________
// (ES6) OBJECT DESTRUCTURING =lets you pull out propreties from an object creating variables
// var user = {name: 'mitz', age: 24};
// var {name} = user;
// console.log(name);

// const MongoClient = require('mongodb').MongoClient;
//face acelasi lucru ca si exemplul original, doar foloseste JS6 si object destructuring
//ObjectID - object id constructor function that lets us make new object IDs on the fly
const {MongoClient, ObjectID} = require('mongodb');

// new -> create a new instanse of objectID.
// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

//initializezi clientul la db.
  const db = client.db('TodoApp')

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   competed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Mitz',
  //   age: 9,
  //   location: 'Planeta Maimutelor'
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert users', err);
  //   }
  //   //getTimestamp returneaza momentul(timpul) in care ObjectId a fost creat
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
  // });

  client.close();
});
