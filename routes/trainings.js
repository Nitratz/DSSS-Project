let express = require('express');
let router = express.Router();
let models = require('../database/models');
let resData = require('../response');
let authCheck = require('../auth_check');

router.post("/", authCheck, function(req, res) {
    let training = req.body;

    models.account.findAll({
        where: {
            id: training.userId
        }
    }).then(result => {
        if (result.length === 0)
            return res.status(400).send(resData(true, 400, "This userId does not exist"));
        models.training.build({
            id_account: training.userId,
            start: training.start,
            stop: training.stop,
            description: training.desc
        }).save().then(result => {
            res.status(201).send(resData(true, 201, "Training successfully created"));
        }).catch(error => {
            res.status(400).send(resData(true, 400, "Insertion on database failed"));
        })
    }).catch(error => {
        res.status(400).send(resData(true, 400, "Error while finding user"));
    });
});

router.get('/:id', function(req, res, next) {
    let userId = req.params.id;

    models.training.findAll({
        where: {
            id_account: userId
        }
    }).then(trainings => {
        res.status(200).send(resData(true, 200, trainings));
    }).catch(error => {
        res.status(400).send(resData(true, 400, error));
    });
});

module.exports = router;