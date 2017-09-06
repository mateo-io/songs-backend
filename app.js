const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);





// TODO configure sess
require('dotenv').config();
require('./server/initializers/passport');
require('./server/config/config.js');
const sessionConfig = {
  secret: 'the pig is on the bath',
  key: 'sid',
  cookie: { secure: false },
  store: new RedisStore()
}

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.set('trust proxy', 1);
// TODO secure cookie in production? 
app.use(session(sessionConfig));


// Require our routes into the application.
require('./server/routes')(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;
