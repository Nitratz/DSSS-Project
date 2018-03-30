let express = require('express');
let router = express.Router();
let models = require('../database/models');
let resData = require('../response');
let authCheck = require('../auth_check');

router.post("/", authCheck, function(req, res) {
    let weight = req.body;

    models.account.findAll({
        where: {
            id: userId
        }
    }).then(result => {
        if (result.length === 0)
            return res.status(400).send(resData(true, 400, "This userId does not exist"));
        models.weight.build({
            id_account: weight.userId,
            time: weight.start,
            weight: weight.stop
        }).save().then(result => {
            res.status(204).send(resData(true, 204, "Weight successfully created"));
        }).catch(error => {
            res.status(400).send(resData(true, 400, "Insertion on database failed"));
        })
    }).catch(error => {
        res.status(400).send(resData(true, 400, "Error while finding user"));
    });
});

module.exports = router;