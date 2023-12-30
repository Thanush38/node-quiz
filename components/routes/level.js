const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/level', (req, res,next) => {
    res.sendFile(path.join(__dirname, '..','..','views', 'level.html'));
    }
);

module.exports = router;