let express = require('express');
let router = express.Router();
let models = require('../../database/models');


router.get('/:id', function(req, res, next) {
    let userId = req.params.id;
    models.account.findAll({
        where: {
            id: userId
        }
    }).then(result => {
        res.render('account', {title: "Account", user: result[0]});
    });

});

module.exports = router;
