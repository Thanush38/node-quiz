const express = require('express');
const path = require('path');
const router = express.Router();

// sends the game page

router.get('/game', (req, res,next) => {
    let level = req.query.level;
    res.sendFile(path.join(__dirname, '..','..','views', 'game.html'));
    }
);

module.exports = router;