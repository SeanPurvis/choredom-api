const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Strategy = require('passport-local').Strategy;

const User = require('../../models').User;
const config = require('../config.js');

const bcrypt = require('bcrypt');

module.exports = function(passport) {
  const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'Our secret goes here',
      issuer: 'Choredom',
      audience: 'choredombitches.io',
      ignoreExpiration: false,
      algorithms: ['HS256'],
    };

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({where: {id: jwt_payload.id}})
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

  passport.use(new Strategy((username, password, done) => {
    User.findOne({where: {username: username}}).then((user, err)=> {
      if (err) return done(err);
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password).then((res,err) => {
        if (!res) return done(null, false);
        if (res) return done(null, user);
        if (err) return done(err);
      });
    });
  }));

  passport.serializeUser((user,done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id,done) => {
    User.findById(id).then((user) => {
      done(user)
    });
  });

};
