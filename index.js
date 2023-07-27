import express from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import moment from 'moment';
import routes from './routes/routes.js';
import cron from 'node-cron';

const app = express();
const port = 3000;
const db = new sqlite3.Database('mydatabase.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});
const theRoutes = routes(db);

//!Schedule Service Task
db.on('trace', (sql) => {
  console.log('Executing', sql);
});

// every 11 seconds
cron.schedule('*/11 * * * * *', () => {
  db.all('SELECT * FROM tasks WHERE status = "pending" AND date_time < datetime("now")', (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    // Update each task to "done" and print it to the console
    rows.forEach((row) => {
      db.run('UPDATE tasks SET status = "done" WHERE id = ?', [row.id], (err) => {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(`Task ${row.id} (${row.name}): ${row.description}`);
      });
    });
  });
});

// !Uncomment line to create tables for users and tasks
// theRoutes.createTable();

app.use(bodyParser.json());

// home page
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
