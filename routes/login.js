let express = require('express');
let router = express.Router();
let models = require('../database/models');
let resData = require('../response');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

router.post("/", function(req, res) {
    let user = req.body;

    models.account.findAll({
        where: {
            username: user.username,
        }
    }).then(userDB => {
        if (userDB.length <= 0) {
            res.status(401).send(resData(false, 401, "Authentication failed. Account not found"));
        } else {
            userDB = userDB[0];
            bcrypt.compare(user.password, userDB.password, function(err, bRes) {
                if (bRes === true) {
                    res.status(200).send(resData(true, 200, {
                        userId: userDB.id,
                        token: jwt.sign({username: user.username, _id: userDB.id}, 'MyTD-RESTAPI', {expiresIn: 86400})
                }));
                } else {
                    res.status(401).send(resData(false, 401, "Authentication failed. Wrong password"));
                }
            });
        }
    });
});

module.exports = router;
