const Group = require('../models').Group;
const GroupSetting = require('../models').GroupSetting;

module.exports = {
  create(req, res) {
    return GroupSetting
      .create({
        name: req.body.name,
      })
      .then(groupsetting => res.status(201).send(groupsetting))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return GroupSetting
      .findAll({
        include: [{
          model: Group,
          as: 'group',
        }],
      })
      .then(groupsettings => res.status(200).send(groupsettings))
      .catch(error => res.status(400).send(error))
  },

  retrieve(req, res) {
    return GroupSetting
      .findById(req.params.groupsettingId, {
        include: [{
          model: Group,
          as: 'group',
        }],
      })
      .then(groupsetting => {
        if (!groupsetting) {
          return res.status(404).send({
            message: 'GroupSetting Not Found',
          });
        }
        return res.status(200).send(groupsetting);
      })
      .catch(error => res.status(400).send(error));
    },

    update(req, res) {
      return GroupSetting
        .findById(req.params.groupsettingId, {
          include: [{
            model: Group,
            as: 'group',
          }],
        })
        .then(groupsetting => {
          if(!todo) {
            return res.status(404).send({
              message: 'GroupSetting Not Found'
            });
          }
          return groupsetting
            .update({
              name: req.body.name || groupsetting.name,
            })
            .then(() => res.status(200).send(groupsetting))
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
      return GroupSetting
        .findById(req.params.groupsettingId)
        .then(groupsetting => {
          if (!groupsetting) {
            return res.status(400).send({
              message: 'GroupSetting Not Found',
            });
          }
          return groupsetting
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error))
    }
  };
