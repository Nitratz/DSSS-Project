let express = require('express');
let router = express.Router();
let dummy = require('./dummydata');


router.get('/accounts/:id', function(req, res, next) {
    let id = req.params.id;
    res.render('account', {title: "Accounts", user: dummy[id]});
});

module.exports = router;
