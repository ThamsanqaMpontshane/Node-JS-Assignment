import assert from 'assert';
import restApi from '../routes/routes.js';
import moment from 'moment';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

const api = restApi(db);

// api.createTable();

describe('Testing the RestApi', () => {
    beforeEach(async () => {
        db.run('DELETE FROM users');
        db.run('DELETE FROM tasks');
    });
    // describe('Testing the defaultRoute function', () => {
    //     it('should return Hello World!', async () => {
    //         const result = await api.defaultRoute();
    //         assert.equal(result, 'Hello World!');
    //     });
    // });

    it('should return User is added to the database', async () => {
        const req = {
            body: {
                first_name: 'test',
                last_name: 'test'
            }
        };
        const res = {
            send: (result) => {
                assert.equal(result, 'User is added to the database');
            }
        };
        await api.createUser(req, res);
    });
    it('should return User is edited', async () => {
        const req = {
            params: {
                id: 1
            },
            body: {
                first_name: 'test',
                last_name: 'test'
            }
        };
        const res = {
            send: (result) => {
                assert.equal(result, 'User is edited');
            }
        };
        await api.updateUser(req, res);
    });
    it('should return all users', async () => {
        const req = {};
        const res = {
            send: (result) => {
                assert.equal(result, api.getAllUsers(req, res));
            }
        };
    });
    it('should return user by id', async () => {
        const req = {
            params: {
                id: 1
            }
        };
        const res = {
            send: async (result) => {
                assert.equal(result, await api.getUserById(req, res));
            }
        };
    });
    it('should return task is added', async () => {
        const req = {
            params: {
                id: 1
            },
            body: {
                name: 'test',
                description: 'test',
                date_time: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        };
        const res = {
            send: (result) => {
                assert.equal(result, 'task is added');
            }
        };
        await api.createTask(req, res);
    });
    it('should return task is edited', async () => {
        const req = {
            params: {
                id: 3,
                task_id: 3
            },
            body: {
                name: 'test',
                description: 'test',
                date_time: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        };
        const res = {
            send: (result) => {
                assert.equal(result, `Task with id ${req.params.task_id} OF user with id ${req.params.task_id} is edited`);
            }
        };
        await api.updateTask(req, res);
    });
    it('should return task is deleted', async () => {
        const req = {
            params: {
                id: 1,
                task_id: 1
            }
        };
        const res = {
            send: (result) => {
                assert.equal(result, `Task with id ${req.params.task_id} OF user with id ${req.params.id} is deleted`)
            }
        };
        await api.deleteTask(req, res);
    });
    it('should return task info', async () => {
        const req = {
            params: {
                id: 1,
                task_id: 1
            }
        };
        const res = {
            send: async (result) => {
                assert.equal(result, await api.getTaskInfo(req, res));
            }
        };
    });
    it('should return tasks for user', async () => {
        const req = {
            params: {
                id: 1
            }
        };
        const res = {
            send: async (result) => {
                assert.equal(result, await api.tasksForUser(req, res))
            }
        };
    });
    it('should return users deleted', async () => {
        const req = {};
        const res = {
            send: async (result) => {
                assert.equal(result, await api.deleteUsers(req, res));
            }
        };
    });
    it('should return tasks deleted', async () => {
        const req = {};
        const res = {
            send: async(result) => {
                assert.equal(result, await api.deleteTasks(req, res));
            }
        };
    });
    after(() => {
     db.close();
    })
})

