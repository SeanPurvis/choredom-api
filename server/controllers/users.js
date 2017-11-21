// server/controllers/users.js
/**
Each controller provides database access to a particular model through
appropriately named functions. These controllers will be mapped to an API
endpoint in a routes file.
**/

const User = require('../models').User;
const bcrypt = require('bcrypt');
    const saltRounds = 10; // Ten salt rounds is considered good practice

module.exports = {
  create(req, res) {


    // We use bcrypt to salted hash incoming passwords before storage in the database
      bcrypt.hash(req.body.password, saltRounds)
          .then(function(hash) {
          return User
          .create({
            password: hash,
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            admin: req.body.admin,
          })
          .then(user => res.status(201).send(user))
          .catch(error => res.status(400).send(error));
      });
    },

  list(req, res) {
    return User
    .findAll()
    .then(users => res.status(200).send(users))
    .catch(error => res.status(200).send(error));
  },

  retrieve(req, res) {
    return User
    .findById(req.params.userId)
    .then(user => {
        if(!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
    })
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }

        bcrypt.hash(req.body.password, saltRounds)
        .then(function(hash) {
        return user
          .update({
            username: req.body.username,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.bdoy.lastName,
            admin: req.body.admin,
          })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })})
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error))
  }
};
