const express = require('express');
const cors = require('cors');
const userRouter = require('./User/Userroute.js');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Welcome to the Contact Directory App");
});

app.use('/api/users', userRouter);



module.exports = app;