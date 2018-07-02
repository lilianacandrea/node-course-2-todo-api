// JWTs and HASHING** (SHA256) and SALT
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//hashing a pass using bcrypt
var password = '123abc!';

//it's an async method. firs param is a callback func, and de sec.is
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashPassword = '$2a$10$xj0X1jl98xqU/OOtfd6rPOEwlhyBi1xpq.2qfsTtuByhRjG5XV7tW';

//compare password with hashPassword
bcrypt.compare(password, hashPassword, (err, res) => {
  console.log(res);
});




// var data = {
//   id: 10
// };
//
// // take as args tha data and the salt hash
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);


// var message = 'I am user number 3';
// var hash = SHA256(message);
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// salting a hash means you add something on to the hash that is unique that changes the value.
// ex: If I hash the string pass, I'm going to get the same result every time. But if I hash the string pass with some sort of randomply generated value like this "somesecret"  I'm going to get a different result.
// And as long as I use a different salt every time I'm never going to get the same hash twice. And this is exactly what we want, we want to have a secret out add on the end like a string. And this is going to salt our hash.
// - the user, the client, they're not going to be albe to manipulate this data anymore. They could change the ID, they could try to rehash but the're not going to have the secret, so their hash is going to be bad.
// When then we try to verify the hash later on, we're going to see that the data and the hash don't quite add up because the person who manipulated it didn't have the secret and we'll be able to deny access for that request.

// //create
// var data = {
//   id: 4
// };
//  var token = {
//    data,
//    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
//  };
//
// // try to change the data.
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//  // verify
//  // this will store the hash of the data that comes back; the data that may or may not have been manipulated
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust!');
// }
