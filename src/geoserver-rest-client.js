var request = require('request');
var Q = require('q');

var GSRC = function (url, user, password) {
    if (!(this instanceof GSRC)) {
        return new GSRC(url, user, password);
    }
    if (!url) {
        throw new Error("Parameter 'url' must not be empty");
    }
    this._url = url;
    this._user = user;
    this._password = password;
    this.req = null;
    this.build();
};

GSRC.prototype.getUrl = function() {
    return this._url;
};
GSRC.prototype.getUser = function() {
    return this._user;
};
GSRC.prototype.getPassword = function() {
    return this._password;
};
GSRC.prototype.setUrl = function(url) {
    if (!url) {
        throw new Error("Parameter 'url' must not be empty");
    }
    this._url = url;
    this.build();
    return this;
};
GSRC.prototype.setUser = function(user) {
    this._user = user;
    this.build();
    return this;
};
GSRC.prototype.setPassword = function(password) {
    this._password = password;
    this.build();
    return this;
};
GSRC.prototype.build = function() {
    this.req = request.defaults({
        baseUrl: this.getUrl(),
        auth: {
            user: this.getUser(),
            pass: this.getPassword()
        }
    });
};
GSRC.reject = function(defer, cb, err) {
    cb = cb || function(){};
    err = typeof err === 'string' ? new Error(err) : err;
    cb(err);
    defer.reject(err);
};
GSRC.resolve = function(defer, cb, data) {
    cb = cb || function(){};
    cb(null, data);
    defer.resolve(data);
};
GSRC.prototype.exists = function(cb){
    var opts = {
        url: '/rest',
        method: 'HEAD'
    };
    var defer = Q.defer();
    this.req(opts, function(err, resp){
        if (err) {
            GSRC.reject(defer, cb, err);
        } else if (resp.statusCode === 200) {
            GSRC.resolve(defer, cb);
        } else if (resp.statusCode === 404) {
            GSRC.reject(defer, cb, "404: URL seems wrong");
        } else if (resp.statusCode === 401) {
            GSRC.reject(
                defer, cb, "401: Credentials wrong or missing"
            );
        } else {
            var msg = "Unspecified error, code: " + resp.statusCode;
            GSRC.reject(defer, cb, msg);
        }
    });
    return defer.promise;
};

exports = module.exports = GSRC;
