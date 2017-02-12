var $ = require("jquery");
var promise = require("es6-promise");
// var baseUrl = 'http://192.168.31.171:9090';
var baseUrl = '';
var resourceUrl = baseUrl + "/api/checkins";

module.exports = {
    getBaseUrl:function(url){
        baseUrl = url;
    },
    getCount: function(p){
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                crossOrigin: true,
                url: baseUrl + "/api/getCheckinCount",
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
                crossOrigin: true,
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
                crossOrigin: true,
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
                crossOrigin: true,
                url: baseUrl + '/api/getMaxCheckin/',
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
                crossOrigin: true,
                url: resourceUrl + "/" + group._id,
                method: "DELETE",
                dataType: "json",
                success: resolve,
                error: reject
            });
        });
    }
};
