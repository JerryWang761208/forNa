var mongoose = require("mongoose");
var Checkin = require("../models/checkin");
var _ = require("underscore");
// var express = require("express");
// var app = express();
var router = require("express").Router();
router.route("/checkins/:id?").get(getCheckins).post(addCheckin).delete(deleteCheckin);
router.route('/getMaxCheckin').post(getMaxCheckin);
router.route('/getCheckinCount').post(getCount);

function getCount(req,res){
    var sex = req.body;

    Checkin.find(sex).exec(function(err,groups){
        if (err){
            res.send(err);
        }else{
            res.json(groups);
        }
    });
}


function getCheckins(req, res) {
    Checkin.find(function (err, groups) {
        if (err){
            res.send(err);
        }else{
            res.json(groups);

        }

    });
}

function getMaxCheckin(req,res){
    var sex = req.body;
    console.log('sex',req);
    Checkin.find(sex).sort({'order':-1}).limit(1).exec(function (err, groups) {
        if (err){
            res.send(err);
        }else{
            res.json(groups);
        }

    });
}

function addCheckin(req, res) {
    console.log(req.body);
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
