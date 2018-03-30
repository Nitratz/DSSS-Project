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
            description: training.description
        }).save().then(result => {
            res.status(204).send(resData(true, 201, "Training successfully created"));
        }).catch(error => {
            res.status(400).send(resData(true, 400, error));
        })
    }).catch(error => {
        res.status(400).send(resData(true, 400, "Error while finding user"));
    });
});

module.exports = router;