let express = require('express');
let router = express.Router();
let models = require('../../database/models');
let resData = require('../../response');
let bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
    models.account.findAll({}).then(result => {
        result.forEach((elem) => {
           elem.birthdate = new Date(elem.birthdate).toLocaleDateString("en-US");
        });
        res.render('accounts', {title: "Accounts", users: result});
    }, err => {
        next(err);
    });
});

router.post("/create", function(req, res) {
    let user = req.body;

    models.account.findAll({
        where: {
            username: user.username
        }
    }).then(result => {
        if (result.length > 0) {
            res.status(409).send(resData(false, 409, "Username already exists"));
        } else {
            bcrypt.hash(user.password, 10, function(err, hash) {
                models.account.build({
                    username: user.username,
                    password: hash,
                    birthdate: user.birthdate,
                    city: user.city
                }).save().then(result => {
                    res.status(204).send(resData(true, 204, "Account successfully created"));
                }).catch(error => {
                    res.status(400).send(resData(true, 400, "Insertion on database failed"));
                })
            });
        }
    });
});

module.exports = router;
