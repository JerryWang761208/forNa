var mongoose = require("mongoose");
var Checkin = require("../models/checkin");
var _ = require("underscore");

var router = require("express").Router();
router.route("/checkins/:id?").get(getCheckins).post(addCheckin).delete(deleteCheckin);

function getCheckins(req, res) {
    Group.find(function (err, groups) {
        if (err)
            res.send(err);
        else
            res.json(groups);
    });
}

function addCheckin(req, res) {
    var group = new Checkin(_.extend({}, req.body));
    group.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json(group);
    });
}

function deleteCheckin(req, res) {
    var id = req.params.id;
    Group.remove({ _id: id }, function (err, removed) {
        if (err)
            res.send(err)
        else
            res.json(removed);
    });
}

module.exports = router;
