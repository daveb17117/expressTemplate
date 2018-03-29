let express = require('express')
  , router = express.Router();
  
// Homepage  
router.get('/', function(req, res) {
  res.render('home.dot');
});

module.exports = router