const Group = require('../models').Group;
const User = require('../models').User;

module.exports = {
  create(req, res) {
    return Group
      .create({
        name: req.body.name,
      })
      .then(group => res.status(201).send(group))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Group
      .findAll({
        include: [{
          model: User,
          as: 'user',
        }],
      })
      .then(groups => res.status(200).send(groups))
      .catch(error => res.status(400).send(error))
  },

  retrieve(req, res) {
    return Group
      .findById(req.params.groupId, {
        include: [{
          model: User,
          as: 'user',
        }],
      })
      .then(group => {
        if (!group) {
          return res.status(404).send({
            message: 'Group Not Found',
          });
        }
        return res.status(200).send(group);
      })
      .catch(error => res.status(400).send(error));
    },

    update(req, res) {
      return Group
        .findById(req.params.groupId, {
          include: [{
            model: User,
            as: 'user',
          }],
        })
        .then(group => {
          if(!todo) {
            return res.status(404).send({
              message: 'Group Not Found'
            });
          }
          return group
            .update({
              name: req.body.name || group.name,
            })
            .then(() => res.status(200).send(group))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
      return Group
        .findById(req.params.groupId)
        .then(group => {
          if (!group) {
            return res.status(400).send({
              message: 'Group Not Found',
            });
          }
          return group
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error))
    }
  };
