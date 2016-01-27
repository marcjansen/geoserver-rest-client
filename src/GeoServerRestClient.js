var request = require('request');
var Q = require('q');

var GeoServerRestClient = function (url, user, password) {
    if (!(this instanceof GeoServerRestClient)) {
        return new GeoServerRestClient(url, user, password);
    }
    if (!url) {
        throw new Exception("Parameter 'url' must not be empty");
    }
    this._url = url;
    this._user = user;
    this._password = password;
    this.req = null;
    this.build();
};

GeoServerRestClient.prototype.getUrl = function() {
    return this._url;
};
GeoServerRestClient.prototype.getUser = function() {
    return this._user;
};
GeoServerRestClient.prototype.getPassword = function() {
    return this._password;
};
GeoServerRestClient.prototype.setUrl = function(url) {
    if (!url) {
        throw new Exception("Parameter 'url' must not be empty");
    }
    this._url = url;
    this.build();
    return this;
};
GeoServerRestClient.prototype.setUser = function(user) {
    this._user = user;
    this.build();
    return this;
};
GeoServerRestClient.prototype.setPassword = function(password) {
    this._password = password;
    this.build();
    return this;
};
GeoServerRestClient.prototype.build = function() {
    this.req = request.defaults({
        baseUrl: this.getUrl(),
        auth: {
            user: this.getUser(),
            pass: this.getPassword()
        }
    });
};
GeoServerRestClient.reject = function(defer, cb, err) {
    cb = cb || function(){};
    err = typeof err === 'string' ? new Error(err) : err;
    cb(err);
    defer.reject(err);
};
GeoServerRestClient.resolve = function(defer, cb, data) {
    cb = cb || function(){};
    cb(null, data);
    defer.resolve(data);
};
GeoServerRestClient.prototype.exists = function(cb){
    var opts = {
        url: '/rest',
        method: 'HEAD'
    };
    var defer = Q.defer();
    this.req(opts, function(err, resp){
        if (err) {
            GeoServerRestClient.reject(defer, cb, err);
        } else if (resp.statusCode === 200) {
            GeoServerRestClient.resolve(defer, cb);
        } else if (resp.statusCode === 404) {
            GeoServerRestClient.reject(defer, cb, "404: URL seems wrong");
        } else if (resp.statusCode === 401) {
            GeoServerRestClient.reject(
                defer, cb, "401: Credentials wrong or missing"
            );
        } else {
            var msg = "Unspecified error, code: " + resp.statusCode;
            GeoServerRestClient.reject(defer, cb, msg);
        }
    });
    return defer.promise;
};

exports = module.exports = GeoServerRestClient;
