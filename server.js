// run MySQL in terminal === /usr/local/mysql/bin/mysql -u root -p

const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
// const apiRouter = require('./routes/index')

// Configuration for connection to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vkontakte1',
    database: 'exchangeagram',
    multipleStatements: true
});

const APP = express();
const PORT = 3000;

// APP.use('/api/exchangeagram', apiRouter)
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

// create a table
APP.get('/createpoststable', (req, res) => {
    let sql = `CREATE TABLE posts(post_id INT AUTO_INCREMENT, user_Id INT, caption VARCHAR(255) DEFAULT '', image VARCHAR(2083), likes INT DEFAULT 0, PRIMARY KEY (post_id))`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Table posts created');
    })
});


// CRUD ROUTES

// insert post route
APP.post('/api/exchangeagram', (req, res) => {
    let sql = 'INSERT INTO posts (caption, image) VALUES ?';
    let values = [
        ['new day new challenges', 'selfie in the mirror'],
        ['beast mode', 'selfie from gym'],
        ['make America great again', 'photo from capitol'],
        ['getting chipped', 'photo vaccination'],
        ['hbd Diana', 'grumpy cat in a clown hat']
    ];
    db.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log(result);
        console.log("Number of records inserted: " + result.affectedRows);
        res.send(result);
    });
});

// update route
APP.put('/api/exchangeagram/:id', (req, res) => {
    // let sql = 'UPDATE posts SET caption = ? WHERE post_id = ?';
    // let values = ['old caption', req.params.id];
    db.query(`UPDATE posts SET caption = 'old caption' WHERE post_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        console.log(result);
        // console.log("Number of records inserted: " + result.affectedRows);
        res.send(result);
    });
});

// get index route
APP.get('/api/exchangeagram', (req, res) => {
    let sql = 'SELECT * FROM posts'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
});

// get one post by post_id
APP.get('/api/exchangeagram/:id', (req, res) => {
    let sql = 'SELECT * FROM posts WHERE post_id = ?'
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
})

// delete post by post_id
APP.delete('/api/exchangeagram/:id', (req, res) => {
    let sql = 'DELETE FROM posts WHERE post_id = ?'
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});



APP.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})