const express = require('express');
const path = require('path');

const router = express.Router();

// router.get('/game', (req, res) => {
//     res.sendFile(path.join(__dirname, '..','..','views', 'game.html'));
//     }
// );

router.get('/game', (req, res,next) => {
    let level = req.query.level;
    res.sendFile(path.join(__dirname, '..','..','views', 'game.html'));
    }
);

module.exports = router;