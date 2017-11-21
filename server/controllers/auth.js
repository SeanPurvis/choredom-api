const User = require('../models').User;
const bcrypt = require('bcrypt');

module.exports = {
  login(req, res) {
    User.findOne({
      username: req.body.username
    })
    .then(user, err => {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication Failed. User not found.'});
      } else if (user) {
        bcrypt.compare()
      }
    })
  }
}
