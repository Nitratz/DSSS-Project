let express = require('express');
let router = express.Router();
let dummy = require('./dummydata');


router.get('/accounts', function(req, res, next) {
    res.render('accounts', {title: "Accounts", users: dummy });
});

module.exports = router;
