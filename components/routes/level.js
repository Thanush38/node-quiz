const express = require('express');
const path = require('path');
const router = express.Router();

// sends the level page
router.get('/level', (req, res,next) => {
    res.sendFile(path.join(__dirname, '..','..','views', 'level.html'));
    }
);

module.exports = router;