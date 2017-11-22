const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').LocalStrategy;

const User = require('../../models').User;
const config = require('../config.js');

const bcrypt = require('bcrypt');

module.exports = function(passport) {
  const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeader(),
      secretOrKey: 'Our secret goes here',
      issuer: 'Choredom',
      audience: 'choredombitches.io',
      ignoreExpiration: false,
      algorithms: ['HS256'],
    };

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id})
      .then(user => {
            if (!user) {
              return done(null, false, 'User not found');
            }

            return done(null, user);
      })
      .catch(err => {
        return done(err);
      });
  }));

  passport.use(new LocalStrategy((username, password, done) =>{
    User.findOne({username: username}, (err, user)=> {
      if (err) return done(err);
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password).then((res,err) => {
        if (!res) return done(null, false);
        if (res) return done(null, user);
        if (err) return done(err);
      })
    })
  })
};
