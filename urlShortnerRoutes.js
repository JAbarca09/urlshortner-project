const express = require('express');
const urlShortnerController = require('./urlShortnerController');

const router = express.Router();

router.get('/shorturl/:shorturl', urlShortnerController.urlRedirection);
router.post('/shorturl', urlShortnerController.shortenUrl);

module.exports = router;
