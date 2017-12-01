const Chore = require('../models').Chore;
const Group = require('../models').Group;
const User = require('../models').User;

moduel.export = {
  create(req, res) {
    return Chore
      .create({
        name: req.body.name,
      })
      .then(chore => res.status(201).send(chore))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Chore
      .findAll({
        include: [{
          model: User,
          as: 'user',
        }],
      })
      .then(chores => res.status(200).send(chores))
      .catch(error => res.status(400).send(error))
  },

  retrieve(req, res) {
    return Chore
      .findById(req.params.choreId, {
        include: [{
          model: User,
          as: 'user',
        }],
        include: [{
          model: Group,
          as: 'group',
        }],
      })
      .then(chore => {
        if (!chore) {
          return res.status(404).send({
            message: 'Chore Not Found',
          });
        }
        return res.status(200).send(chore);
      })
      .catch(error => res.status(400).send(error));
    },

    update(req, res) {
      return Chore
        .findById(req.params.choreId, {
          include: [{
            model: User,
            as: 'user',
          }],
          include: [{
            model: Group,
            as: 'group',
          }],
        })
        .then(chore => {
          if(!todo) {
            return res.status(404).send({
              message: 'Chore Not Found'
            });
          }
          return chore
            .update({
              name: req.body.name || chore.name,
            })
            .then(() => res.status(200).send(chore))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
      return Chore
        .findById(req.params.choreId)
        .then(chore => {
          if (!chore) {
            return res.status(400).send({
              message: 'Chore Not Found',
            });
          }
          return chore
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error))
    }
  };
