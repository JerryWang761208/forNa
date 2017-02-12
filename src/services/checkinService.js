var $ = require("jquery");
var promise = require("es6-promise");
var resourceUrl = "http://localhost:9090/api/checkins";

module.exports = {
    getCount: function(p){
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "http://localhost:9090/api/getCheckinCount",
                data: JSON.stringify(p),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: reject
            });
        });
    },
    addCheckin: function (group) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl,
                data: JSON.stringify(group),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: reject
            });
        });
    },
    getCheckins: function () {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl,
                method: "GET",
                dataType: "json",
                success: resolve,
                error: reject
            });
        });
    },

    getMaxCheckin: function (data) {
        console.log('data',data);
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: 'http://localhost:9090/api/getMaxCheckin/',
                data: JSON.stringify(data),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: reject
            });
        });
    },

    deleteCheckin: function (group) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl + "/" + group._id,
                method: "DELETE",
                dataType: "json",
                success: resolve,
                error: reject
            });
        });
    }
};
