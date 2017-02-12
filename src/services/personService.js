var $ = require("jquery");
var promise = require("es6-promise");
// var baseUrl = 'http://192.168.31.171:9090';
var baseUrl = '';
var resourceUrl = baseUrl + "/api/people";

module.exports = {
    getBaseUrl:function(url){
        baseUrl = url;
    },
    addPerson: function (person) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                crossOrigin: true,
                url: baseUrl + "/api/import",
                data: JSON.stringify(person),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: reject
            });
        });
    },
    findPerson: function(name){
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                crossOrigin: true,
                url: resourceUrl,
                data: JSON.stringify(name),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: reject
            });
        });
    },
    getPeople: function () {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                crossOrigin: true,
                url: resourceUrl,
                method: "GET",
                dataType: "json",
                success: resolve,
                error: reject
            });
        });
    },
    deletePerson: function (person) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                crossOrigin: true,
                url: resourceUrl + "/" + person._id,
                method: "DELETE",
                dataType: "json",
                success: resolve,
                error: reject
            });
        });
    }
};
