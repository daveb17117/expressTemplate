var express = require('express')
  , router = express.Router()

// This will map all pages with in pages.js to /
router.use('/', require('./pages'));

module.exports = router