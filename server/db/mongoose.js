//POSTMAN let you create HTTP request and fire them off. Intalnit peste tot!!
 //folosit ptr.a face postback la toate requesturile din aplicatie.

var mongoose = require('mongoose');

 //connect to database
 mongoose.Promise = global.Promise;
 mongoose.connect('mongodb://localhost:27017/TodoApp');

 module.exports = {mongoose};
