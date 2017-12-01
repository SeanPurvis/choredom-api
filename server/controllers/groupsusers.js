const GroupUser = require('../models').GroupUser;
const Group = require('../models').Group;
const User = require('../models').User;

moduel.export = {
  create(req, res) {
    return GroupUser
      .create({
        name: req.body.name,
      })
      .then(groupuser => res.status(201).send(groupuser))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return GroupUser
      .findAll({
        include: [{
          model: User,
          as: 'user',
        }],
      })
      .then(groupusers => res.status(200).send(groupusers))
      .catch(error => res.status(400).send(error))
  },

  retrieve(req, res) {
    return GroupUser
      .findById(req.params.groupuserId, {
        include: [{
          model: User,
          as: 'user',
        }],
        include: [{
          model: Group,
          as: 'group',
        }],
      })
      .then(groupuser => {
        if (!groupuser) {
          return res.status(404).send({
            message: 'GroupUser Not Found',
          });
        }
        return res.status(200).send(groupuser);
      })
      .catch(error => res.status(400).send(error));
    },

    update(req, res) {
      return GroupUser
        .findById(req.params.groupuserId, {
          include: [{
            model: User,
            as: 'user',
          }],
          include: [{
            model: Group,
            as: 'group',
          }],
        })
        .then(groupuser => {
          if(!todo) {
            return res.status(404).send({
              message: 'GroupUser Not Found'
            });
          }
          return groupuser
            .update({
              name: req.body.name || groupuser.name,
            })
            .then(() => res.status(200).send(groupuser))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
      return GroupUser
        .findById(req.params.groupuserId)
        .then(groupuser => {
          if (!groupuser) {
            return res.status(400).send({
              message: 'GroupUser Not Found',
            });
          }
          return groupuser
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error))
    }
  };
