const usersController = require('../controllers').users;
const choresController = require('../controllers').chores;
const groupsController = require('../controllers').groups;
const groupsusersController = require('../controllers').groupsusers;
const groupsettingsController = require('../controllers').groupsettings;


// This file exists to map controllers to API endpoints
module.exports = (app, passport, jwt) => {
  app.get('/api/v1/', (req, res) => res.status(200).send({
    message: 'Welcome to the API, you have succesfully logged in.',
  }));

// User routes
app.post('/api/v1/users', usersController.create);
app.get('/api/v1/users', usersController.list);
app.get('/api/v1/users/:userId', usersController.retrieve);
app.put('/api/v1/users/:userId', usersController.update);
app.delete('/api/v1/users/:userId', usersController.destroy);

// Chore routes
app.post('/api/v1/chores', choresController.create);
app.get('/api/v1/chores', choresController.list);
app.get('/api/v1/chores/:choreId', choresController.retrieve);
app.put('/api/v1/chores/:choreId', choresController.update);
app.delete('/api/v1/chores/:choreId', choresController.destroy);

// GroupSettings routes
app.post('/api/v1/groupsettings', groupsettingsController.create);
app.get('/api/v1/groupsettings', groupsettingsController.list);
app.get('/api/v1/groupsettings/:groupsettingsId', groupsettingsController.retrieve);
app.put('/api/v1/groupsettings/:groupsettingsId', groupsettingsController.update);
app.delete('/api/v1/groupsettings/:groupsettingsId', groupsettingsController.destroy);

// Group Routes
app.post('/api/v1/groups', groupsController.create);
app.get('/api/v1/groups', groupsController.list);
app.get('/api/v1/groups/:groupsId', groupsController.retrieve);
app.put('/api/v1/groups/:groupsId', groupsController.update);
app.delete('/api/v1/groups/:groupsId', groupsController.destroy);

// GroupsUsers routes
app.post('/api/v1/groupsusers', groupsusersController.create);
app.get('/api/v1/groupsusers', groupsusersController.list);
app.get('/api/v1/groupsusers/:groupsusersId', groupsusersController.retrieve);
app.put('/api/v1/groupsusers/:groupsusersId', groupsusersController.update);
app.delete('/api/v1/groupsusers/:groupsusersId', groupsusersController.destroy);

// Login route
app.post('/api/v1/login', (req,res,next)=> {
  passport.authenticate('local', (err, user, info)=>{
    if(err){
      return res.status(401).send({
        success:false,
        error: err
      });
    }

    if(!user){
      return res.status(401).send({
        success:false,
        error: info
      });
    }

    const token = jwt.sign({
      id: user.id
    }, 'Your secret here', {
      expiresIn: 432000, // In seconds = 5 days
      audience: 'myapp.com',
      issuer: 'myApp'
    });

    return res.send({
      success:true,
      token: token
    })
  })(req,res,next)
});
};
