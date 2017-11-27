const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;
const choresController = require('../controllers').chores;
const groupsController = require('../controllers').groups;
const groupsusersController = require('../controllers').groupsusers;
const groupsettingsController = require('../controllers').groupsettings;

// This file exists to map controllers to API endpoints
module.exports = (app, passport) => {
  app.get('/api/v1/', (req, res) => res.status(200).send({
    message: 'Welcome to the API',
  }));

// Todo routes
  app.post('/api/v1/todos', todosController.create);
  app.get('/api/v1/todos', todosController.list);
  app.get('/api/v1/todos/:todoId', todosController.retrieve);
  app.put('/api/v1/todos/:todoId', todosController.update);
  app.delete('/api/v1/todos/:todoId', todosController.destroy);

// TodoItem routes
  app.post('/api/v1/todos/:todoId/items', todoItemsController.create);
  app.put('/api/v1/todos/:todoId/items/:todoItemId', todoItemsController.update);
  app.delete(
    '/api/v1/todos/:todoId/items/:todoItemId', todoItemsController.destroy
  );

// User routes
app.post('/api/v1/users', usersController.create);
app.get('/api/v1/users', usersController.list);
app.get('/api/v1/users/:userId', usersController.retrieve);
app.put('/api/v1/users/:userId', usersController.update);
app.delete('/api/v1/users/:userId', usersController.destroy);

// User routes
app.post('/api/v1/chores', choresController.create);
app.get('/api/v1/chores', choresController.list);
app.get('/api/v1/chores/:choreId', choresController.retrieve);
app.put('/api/v1/chores/:choreId', choresController.update);
app.delete('/api/v1/chores/:choreId', choresController.destroy);

app.post('/api/v1/groupsettings', groupsettingsController.create);
app.get('/api/v1/groupsettings', groupsettingsController.list);
app.get('/api/v1/groupsettings/:groupsettingsId', groupsettingsController.retrieve);
app.put('/api/v1/groupsettings/:groupsettingsId', groupsettingsController.update);
app.delete('/api/v1/groupsettings/:groupsettingsId', groupsettingsController.destroy);

app.post('/api/v1/groups', groupsController.create);
app.get('/api/v1/groups', groupsController.list);
app.get('/api/v1/groups/:groupsId', groupsController.retrieve);
app.put('/api/v1/groups/:groupsId', groupsController.update);
app.delete('/api/v1/groups/:groupsId', groupsController.destroy);

app.post('/api/v1/groupsusers', groupsusersController.create);
app.get('/api/v1/groupsusers', groupsusersController.list);
app.get('/api/v1/groupsusers/:groupsusersId', groupsusersController.retrieve);
app.put('/api/v1/groupsusers/:groupsusersId', groupsusersController.update);
app.delete('/api/v1/groupsusers/:groupsusersId', groupsusersController.destroy);



// Login route
app.post('/api/v1/login', passport.authenticate('local', {failureRedirect: '/loginFail', successRedirect: '/'}));

// For any other request on TodoItems
  app.all('/api/v1/todos/:todoId/items', (req, res) =>
    res.status(405).send({
      message: "Method Not Allowed",
    }));
};
