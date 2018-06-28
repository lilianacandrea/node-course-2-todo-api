var mongoose = require('mongoose');
//Challenge
//User
//email - require it - trim interval - set type - set min length of 1
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

// var newUser = new User({
//   email: 'mitzi@coadademaimuta.com'
// });
// newUser.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//   console.log('Unable to save user', err);
// });

module.exports = {User};
