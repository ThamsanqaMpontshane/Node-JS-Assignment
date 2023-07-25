import moment from 'moment';
const restApi = (db) => {
    async function defaultRoute(req, res) {
        res.send('Hello World!');
    }
    async function createTable() {
        const userTable = `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL
            );`;
        db.run(userTable, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('Users table created.')
        }
        );
        const taskTable = `CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            date_time TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
            );`;
        db.run(taskTable, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('Tasks table created.');
        }
        );
    }
    async function createUser(req, res) {
        const user = req.body;
        const sql = `INSERT INTO users (username, first_name, last_name) VALUES ('${user.username}', '${user.first_name}', '${user.last_name}')`;
        db.run(sql, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('User created.');
        }
        );
        res.send('User is added to the database');
    }
    async function updateUser(req, res) {
        const id = req.params.id;
        const user = req.body;
        const sql = `UPDATE users SET first_name = '${user.first_name}', last_name = '${user.last_name}' WHERE id = ${id}`;
        db.run(sql, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('User updated.');
        }
        );
        res.send('User is edited');
    }
    async function getAllUsers(req, res) {
        const sql = `SELECT * FROM users`;
        db.all(sql, [], (err, users) => {
            if (err) {
                console.log(err);
            }else if(users.length === 0){
                res.send('No users in the database');
            }
            res.send(users);
        });
    }
    async function getUserById(req, res) {
        const id = req.params.id;
        const sql = `SELECT * FROM users WHERE id = ${id}`;
        db.get(sql, (err, user) => {
            if (err) {
                console.log(err);
            }else if(user === undefined){
                res.send('No user with this id in the database');
            }
            res.send(user);
        });
    }
    async function createTask(req, res) {
        const id = req.params.id;
        const task = req.body;
        // i want my time to be in this format 2016-05-25 14:25:00
        const time = moment(task.date_time).format('YYYY-MM-DD HH:mm:ss');
        console.log(time);
        const sql = `INSERT INTO tasks (user_id, name, description, date_time) VALUES (${id}, '${task.name}', '${task.description}', '${time}')`;
        db.run(sql, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('Task created for user id ' + id);
        }
        );
        res.send('Task is added to the database');
    }
    async function updateTask(req, res) {
        const id = req.params.id;
        const task_id = req.params.task_id;
        const task = req.body;
        const sql = `UPDATE tasks SET name = '${task.name}' WHERE id = ${task_id}`;
        db.run(sql, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('Task updated for user id ' + id);
        }
        );
        res.send(`Task with id ${task_id} OF user with id ${id} is edited`);
    }
    async function deleteTask(req, res) {
        const id = req.params.id;
        const task_id = req.params.task_id;
        const sql = `DELETE FROM tasks WHERE id = ${task_id} and user_id = ${id}`;
        db.run(sql, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('Task deleted for user id ' + id);
        }
        );
        res.send(`Task with id ${task_id} OF user with id ${id} is deleted`);
    }
    async function getTaskInfo(req, res) {
        const id = req.params.id;
        const task_id = req.params.task_id;
        const sql = `SELECT * FROM tasks WHERE id = ${task_id} and user_id = ${id}`;
        db.get(sql, (err, task) => {
            if (err) {
                console.log(err);
            }
            res.send(task);
        });
    }
    async function tasksForUser(req, res) {
        const id = req.params.id;
        const sql = `SELECT * FROM tasks WHERE user_id = ${id}`;
        db.all(sql, [], (err, tasks) => {
            if (err) {
                console.log(err);
            }else if(tasks.length === 0 ){
                console.log('No tasks for this user in the database');
            }
            res.send(tasks);
        });
    }
    async function deleteUsers(){
        const sql = `DELETE FROM users`;
        db.run(sql, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('Users deleted.');
        }
        );
    }
    async function deleteTasks(){
        const sql = `DELETE FROM tasks`;
        db.run(sql, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('Tasks deleted.');
        }
        );
    }
    return {
        defaultRoute,
        createTable,
        createUser,
        updateUser,
        getAllUsers,
        getUserById,
        createTask,
        updateTask,
        deleteTask,
        getTaskInfo,
        tasksForUser,
        deleteUsers,
        deleteTasks
    }
}

export default restApi;