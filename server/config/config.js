var env = process.env.NODE_ENV || 'development'; // Only for Heroku

if (env === 'development' || env === 'test') {
  var config = require('./config.json');
  var envConfig = config[env];

// Keys - it gets all of the keys and it returns them as an array
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
