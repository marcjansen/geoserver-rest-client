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
    // TODO
};

exports = module.exports = GeoServerRestClient;
