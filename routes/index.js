const express = require('express');
const ROUTER = express.Router();

ROUTER.get('/', (req, res) => {
    res.json({ test: 'test' })
})

module.exports = ROUTER;