var GSRC = require('../index.js');

var gsClient = new GSRC(
        'http://curveball-box:8080/geoserver275',
        'admin', 'geoserver'
    );


// with callback
gsClient
    .exists(function(err){
        if (!err) {
            console.log("ALL GOOD!");
            return;
        }
        console.error(err);
    });

// with promise
gsClient
    .exists()
    .then(function(){
        console.log("ALL GOOD!");
    })
    .fail(function(err){
        console.error(err);
    });
