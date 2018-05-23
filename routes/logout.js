let express = require('express');
let router = express.Router();
let resData = require('../response');

router.post("/", function(req, res) {
    if (req.session)
        req.session.destroy();
    res.status(200).send(resData(true, 200, "Successfully Logout"));
});

module.exports = router;
