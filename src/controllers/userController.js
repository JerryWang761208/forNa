var mongoose = require("mongoose");
var Users = require("../models/users");
var _ = require("underscore");

var router = require("express").Router();
router.route("/users/:id?").post(checkUsers);

function checkUsers(req, res) {
    var user = req.body;
    Users.find(user).exec(function (err, users) {
        if (err)
            res.send(err);
        else
            res.json(users);
    });
}

module.exports = router;
