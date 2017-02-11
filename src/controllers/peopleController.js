var mongoose = require("mongoose");
var People = require("../models/people");
var _ = require("underscore");

var router = require("express").Router();
router.route("/people/:id?").get(getPeople).post(findPerson).post(addPerson).delete(deletePerson);




function getPeople(req, res) {

    People.find({},function (err, people) {
        if (err)
            res.send(err);
        else
            res.json(people);
    });
}

function findPerson(req, res){
    const {name} = req.body;
    People.find({ 'name': new RegExp(name, 'i') },function (err, people) {
        if (err)
            res.send(err);
        else
            res.json(people);
    });
}

function addPerson(req, res) {
    var person = new People(_.extend({}, req.body));
    person.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json(person);
    });
}

function deletePerson(req, res) {
    var id = req.params.id;
    People.remove({ _id: id }, function (err, removed) {
        if (err)
            res.send(err)
        else
            res.json(removed);
    });
}

module.exports = router;
