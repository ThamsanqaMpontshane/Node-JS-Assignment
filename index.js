import express from 'express';
import bodyParser from 'body-parser';
import  sqlite3  from 'sqlite3';
import moment from 'moment';
import routes from './routes/routes.js';

const app = express();
const port = 3000;
const db = new sqlite3.Database('mydatabase.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});
const theRoutes = routes(db);

// !Uncomment line to create tables for users and tasks
// theRoutes.createTable();

app.use(bodyParser.json());

app.get('/', theRoutes.defaultRoute);
// create user
app.post('/api/users', theRoutes.createUser);
// update user
app.put('/api/users/:id', theRoutes.updateUser);
// get all users
app.get('/api/users', theRoutes.getAllUsers);
// get user by id
app.get('/api/users/:id', theRoutes.getUserById);
// create a task for user by id
app.post('/api/users/:id/tasks', theRoutes.createTask);
// update task for user by id
app.put('/api/users/:id/tasks/:task_id', theRoutes.updateTask);
// delete task for user by id
app.delete('/api/users/:id/tasks/:task_id', theRoutes.deleteTask);
// get task info for user by id
app.get('/api/users/:id/tasks/:task_id', theRoutes.getTaskInfo);
// get all tasks for user by id
app.get('/api/users/:id/tasks', theRoutes.tasksForUser);

// !Uncomment line below to delete all users
// theRoutes.deleteUsers();

// !Uncomment line below to delete all tasks
// theRoutes.deleteTasks();

app.listen(port, () => console.log(`App listening on port ${port}!`));
