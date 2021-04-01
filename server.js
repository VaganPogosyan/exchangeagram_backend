const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const apiRouter = require('./controllers/index')

const APP = express();
const PORT = 3000;

APP.use('/api/exchangeagram', apiRouter)
APP.use(express.json());

APP.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})