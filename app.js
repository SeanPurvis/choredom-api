const express = require('express')
const logger = require('morgan')
const config = require('./server/config/config')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;


// Setup the express application
const app = express();

// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
require('./server/config/passport/passport')(passport);

// Require our routes into the application
require('./server/routes')(app,passport);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning.'
}));

module.exports = app;
