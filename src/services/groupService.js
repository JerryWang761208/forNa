var $ = require("jquery");
var promise = require("es6-promise");
// var baseUrl = 'http://192.168.31.171:9090';
var baseUrl = '';
var resourceUrl = baseUrl + "/api/groups";

module.exports = {
    getBaseUrl:function(url){
        baseUrl = url;
    },
    addGroup: function (group) {
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
    getGroups: function () {
        // resourceUrl = this.baseUrl + "/api/groups";

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
    deleteGroup: function (group) {
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
