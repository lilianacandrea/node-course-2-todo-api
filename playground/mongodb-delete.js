const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');
// deleteMany: sterge toate documentele care intalnesc criteriul
// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
//   console.log(result);
// });

// deleteOne: sterge doar un document care care intalneste criteriul, chiar daca sunt duplicates or something similar
// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
//   console.log(result);
// });

// findOneAndDelete: sterge documentul in functie de ID. Daca Id-ul exista, atunci il sterge. Nu trebuie sa stii ce fel de date contine obiectul respectiv
// It's super handily: in terminal iti va arata ca sters un document si pe care exact. (In general este primul care intruneste conditia)
// db.collection('Todos').findOneAndDelete({completed:false}).then((result) => {
//   console.log(result);
// });

//Challenge: sa stergem folosind deleteMany and findOneAndDelete(dupa id)
// db.collection('Users').deleteMany({name: 'Mitz'});

db.collection('Users').findOneAndDelete({_id: new ObjectID('5b33b405638cf67358ee7b58')}).then((results) => {
  console.log(JSON.stringify(results, undefined, 2));
});


  // client.close();
});
