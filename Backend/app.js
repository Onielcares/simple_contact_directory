const express = require('express');
const cors = require('cors');
const userRouter = require('./User/Userroute.js');
const contactRouter = require('./Contacts/Contactroute.js');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("Welcome to the Contact Directory App");
});

app.use('/api/users', userRouter);
app.use('/api/contacts', contactRouter);



module.exports = app;