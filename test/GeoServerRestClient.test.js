var test = require("tape");

var GeoServerRestClient = require("../index.js");

test("Exports", function (t) {
    t.plan(1);
    t.ok(GeoServerRestClient instanceof Function,
        "GeoServerRestClient exported");
});

test("Instanciation with `new`", function (t) {
    t.plan(1);
    var client = new GeoServerRestClient("http://localhost:8080/geoserver");
    t.ok(client instanceof GeoServerRestClient,
      "client can be instanciated with new");
});

test("Instanciation without `new`", function (t) {
    t.plan(1);
    var client = GeoServerRestClient("http://localhost:8080/geoserver");
    t.ok(client instanceof GeoServerRestClient,
        "client can be instanciated without new");
});

test("First parameter (url) is required", function(t) {
    t.plan(4);
    var client1;
    var client2;
    t.throws(function(){
        client1 = new GeoServerRestClient();
    });
    t.ok(client1 === undefined, "Constructor throws without url");
    t.doesNotThrow(function(){
        client2 = new GeoServerRestClient("some-url");
    });
    t.ok(client2 instanceof GeoServerRestClient, "Constructor works with url");
});

test("API", function (t) {
    var methods = [
        "getUrl", "setUrl",
        "getUser", "setUser",
        "getPassword", "setPassword",
        "build"
    ];
    t.plan(methods.length);
    var client = GeoServerRestClient("http://localhost:8080/geoserver");
    methods.forEach(function(methodName) {
        t.ok(client[methodName] instanceof Function,
            methodName + " is a function");
    });
});

test("getUrl", function(t) {
    t.plan(1);
    var client = GeoServerRestClient("foo", "bar", "baz");
    t.equals(client.getUrl(), "foo", "Getter for `url` works");
});
test("setUrl", function(t) {
    t.plan(6);
    var client = GeoServerRestClient("foo", "bar", "baz");
    client.setUrl("FOO");
    t.equals(client.getUrl(), "FOO", "Setter for `url` works");
    t.throws(function() {
        client.setUrl();
    });
    t.throws(function() {
        client.setUrl(null);
    });
    t.throws(function() {
        client.setUrl("");
    });
    t.throws(function() {
        client.setUrl(0);
    });
    t.throws(function() {
        client.setUrl(false);
    });
});

test("getUser", function(t) {
    t.plan(1);
    var client = GeoServerRestClient("foo", "bar", "baz");
    t.equals(client.getUser(), "bar", "Getter for `user` works");
});
test("setUser", function(t) {
    t.plan(1);
    var client = GeoServerRestClient("foo", "bar", "baz");
    client.setUser("BAR");
    t.equals(client.getUser(), "BAR", "Setter for `user` works");
});

test("getPassword", function(t) {
    t.plan(1);
    var client = GeoServerRestClient("foo", "bar", "baz");
    t.equals(client.getPassword(), "baz", "Getter for `password` works");
});
test("setPassword", function(t) {
    t.plan(1);
    var client = GeoServerRestClient("foo", "bar", "baz");
    client.setPassword("BAZ");
    t.equals(client.getPassword(), "BAZ", "Setter for `password` works");
});
