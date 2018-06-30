//POSTMAN let you create HTTP request and fire them off. Intalnit peste tot!!
 //folosit ptr.a face postback la toate requesturile din aplicatie.

var mongoose = require('mongoose');

 //connect to database
 mongoose.Promise = global.Promise;
 mongoose.connect(process.env.MONGODB_URI);

 module.exports = {mongoose};

 // create a database for tests
 // we can have 3 environments: PRODUCTION, DEVELOPMENT, !! TEST - run through Mocha (putem sa setam un environment diferit pentru mongoDB )
 // process.env.NODE_ENV ==='production'; =====> ONLY FOR HEROKU!!
