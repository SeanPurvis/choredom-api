const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;

// This file exists to map controllers to API endpoints
module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the API',
  }));

// Todo routes
  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.get('/api/todos/:todoId', todosController.retrieve);
  app.put('/api/todos/:todoId', todosController.update);
  app.delete('/api/todos/:todoId', todosController.destroy);

// TodoItem routes
  app.post('/api/todos/:todoId/items', todoItemsController.create);
  app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  app.delete(
    '/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy
  );

// User routes
app.post('/api/users', usersController.create);
app.get('/api/users', usersController.list);
app.get('/api/users/:userId', usersController.retrieve);
app.put('/api/users/:userId', usersController.update);
app.delete('/api/users/:userId', usersController.destroy);

// For any other request on TodoItems
  app.all('/api/todos/:todoId/items', (req, res) =>
    res.status(405).send({
      message: "Method Not Allowed",
    }));
};
