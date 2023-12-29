const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/end', (req, res,next) => {
    res.sendFile(path.join(__dirname, '..','..','views', 'end.html'));
    }
);

module.exports = router;