var mongoose = require("mongoose");
var Group = require("../models/groups");
var _ = require("underscore");

var router = require("express").Router();
router.route("/groups/:id?").get(getGroups).post(addGroup).delete(deleteGroup);

function getGroups(req, res) {
    Group.find(function (err, groups) {
        if (err)
            res.send(err);
        else
            res.json(groups);
    });
}

function addGroup(req, res) {
    var group = new Group(_.extend({}, req.body));
    group.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json(group);
    });
}

function deleteGroup(req, res) {
    var id = req.params.id;
    Group.remove({ _id: id }, function (err, removed) {
        if (err)
            res.send(err)
        else
            res.json(removed);
    });
}

module.exports = router;
