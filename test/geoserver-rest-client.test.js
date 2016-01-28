var test = require("tape");

var GSRC = require("../index.js");

test("Exports", function (t) {
    t.plan(1);
    t.ok(GSRC instanceof Function,
        "GSRC exported");
});

test("Instanciation with `new`", function (t) {
    t.plan(1);
    var client = new GSRC("http://localhost:8080/geoserver");
    t.ok(client instanceof GSRC,
      "client can be instanciated with new");
});

test("Instanciation without `new`", function (t) {
    t.plan(1);
    var client = GSRC("http://localhost:8080/geoserver");
    t.ok(client instanceof GSRC,
        "client can be instanciated without new");
});

test("First parameter (url) is required", function(t) {
    t.plan(4);
    var client1;
    var client2;
    t.throws(function(){
        client1 = new GSRC();
    });
    t.ok(client1 === undefined, "Constructor throws without url");
    t.doesNotThrow(function(){
        client2 = new GSRC("some-url");
    });
    t.ok(client2 instanceof GSRC, "Constructor works with url");
});

test("Static functions", function(t) {
    var methods = [
        "reject", "resolve"
    ];
    t.plan(methods.length);
    methods.forEach(function(methodName) {
        t.ok(GSRC[methodName] instanceof Function,
            methodName + " is a function of the GSRC object");
    });
});

test("API", function (t) {
    var methods = [
        "getUrl", "setUrl",
        "getUser", "setUser",
        "getPassword", "setPassword",
        "build",
        "exists"
    ];
    t.plan(methods.length);
    var client = GSRC("http://localhost:8080/geoserver");
    methods.forEach(function(methodName) {
        t.ok(client[methodName] instanceof Function,
            methodName + " is an GSRC instance method");
    });
});

test("getUrl", function(t) {
    t.plan(1);
    var client = GSRC("foo", "bar", "baz");
    t.equals(client.getUrl(), "foo", "Getter for `url` works");
});
test("setUrl", function(t) {
    t.plan(6);
    var client = GSRC("foo", "bar", "baz");
    client.setUrl("FOO");
    t.equals(client.getUrl(), "FOO", "Setter for `url` works");
    t.throws(function() {
        client.setUrl();
    }, Error, "throws when url undefined");
    t.throws(function() {
        client.setUrl(null);
    }, Error, "throws when url null");
    t.throws(function() {
        client.setUrl("");
    }, Error, "throws when url ''");
    t.throws(function() {
        client.setUrl(0);
    }, Error, "throws when url 0");
    t.throws(function() {
        client.setUrl(false);
    }, Error, "throws when url false");
});

test("getUser", function(t) {
    t.plan(1);
    var client = GSRC("foo", "bar", "baz");
    t.equals(client.getUser(), "bar", "Getter for `user` works");
});
test("setUser", function(t) {
    t.plan(1);
    var client = GSRC("foo", "bar", "baz");
    client.setUser("BAR");
    t.equals(client.getUser(), "BAR", "Setter for `user` works");
});

test("getPassword", function(t) {
    t.plan(1);
    var client = GSRC("foo", "bar", "baz");
    t.equals(client.getPassword(), "baz", "Getter for `password` works");
});
test("setPassword", function(t) {
    t.plan(1);
    var client = GSRC("foo", "bar", "baz");
    client.setPassword("BAZ");
    t.equals(client.getPassword(), "BAZ", "Setter for `password` works");
});
