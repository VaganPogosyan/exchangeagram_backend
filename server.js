// run MySQL in terminal === /usr/local/mysql/bin/mysql -u root -p

const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const apiRouter = require('./routes/index')

// Configuration for connection to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vkontakte1',

});

const APP = express();
const PORT = 3000;

APP.use('/api/exchangeagram', apiRouter)
APP.use(express.json());

// Connect to MySQL (throw an error if there is one, if not console.log)
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL is connected')
})

// Create db
APP.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE exchangeagram';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database exchangeagram created');
    })
});




APP.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})