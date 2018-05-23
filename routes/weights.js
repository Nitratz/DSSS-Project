let express = require('express');
let router = express.Router();
let models = require('../database/models');
let resData = require('../response');
let authCheck = require('../auth_check');

router.post("/", authCheck, function(req, res) {
    let weight = req.body;

    models.account.findAll({
        where: {
            id: weight.userId
        }
    }).then(result => {
        if (result.length === 0)
            return res.status(400).send(resData(true, 400, "This userId does not exist"));
        models.weight.build({
            id_account: weight.userId,
            time: weight.date,
            weight: weight.weight
        }).save().then(result => {
            res.status(201).send(resData(true, 201, "Weight successfully created"));
        }).catch(error => {
            res.status(400).send(resData(true, 400, "Insertion on database failed"));
        })
    }).catch(error => {
        res.status(400).send(resData(true, 400, "Error while finding user"));
    });
});

router.get('/:id', function(req, res, next) {
    let userId = req.params.id;

    models.weight.findAll({
        where: {
            id_account: userId
        }
    }).then(weights => {
        res.status(200).send(resData(true, 200, weights));
    }).catch(error => {
        res.status(400).send(resData(true, 400, error));
    });
});

module.exports = router;