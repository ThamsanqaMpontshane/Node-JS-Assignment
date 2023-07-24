// simple node js restful apllication that manages users and tasks for those users, no database is used, all data is stored in memory, no need for ui, just restful api
import express from 'express';
import bodyParser from 'body-parser';
import localStorage from 'localStorage';
import {MongoClient} from 'mongodb';

const app = express();
const port = 3000;
const url = "mongodb+srv://theboss:luckeezbhelas@nodedatabase.gmofgd1.mongodb.net/?retryWrites=true&w=majority";

import fs from 'fs';

app.use(bodyParser.json());

let users = [];
let tasks = [];

app.get('/', (req, res) => {
    localStorage.setItem('users', JSON.stringify(users));
    res.send('Node Js Assignment');
});

// create user
app.post('/api/users', (req, res) => {
    const user = req.body;
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    res.send('User is added to the database');
});
// get all users
app.get('/api/users', (req, res) => {
    const users = JSON.parse(localStorage.getItem('users'));
    res.send(users);
});
// update user
app.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;
    // when i create my user i dont give it an id so i have to give it an id here
    user.id = id;
    localStorage.setItem('users', JSON.stringify(users));
    res.send('User is edited');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
