let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('about', { title: 'About us' });
});

module.exports = router;
