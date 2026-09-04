const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const cors = require('cors');
const app = express();
const ConnectToDb = require('./db/db');

ConnectToDb();

app.use(cors());

app.get('/' , (req , res) => {
    res.send('Hello world')
})

module.exports= app;