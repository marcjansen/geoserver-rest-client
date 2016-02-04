var GSRC = require('../index.js');

var gsClient = new GSRC(
        'http://curveball-box:8080/geoserver275',
        'admin', 'geoserver'
    );


// // with callback
// gsClient
//     .exists(function(err){
//         if (!err) {
//             console.log("ALL GOOD!");
//             return;
//         }
//         console.error(err);
//     });
//
// // with promise
// gsClient
//     .exists()
//     .then(function(){
//         console.log("ALL GOOD!");
//     })
//     .fail(function(err){
//         console.error(err);
//     });

var wsName;

gsClient
    .workspaces()
    .then(function(data){
        console.log("got " + data.workspaces.workspace.length + " ws");
        return gsClient.workspace(data.workspaces.workspace[4].name);
    })
    .then(function(data) {
        console.log("got details of " + data.workspace.name + " ws");
        wsName = data.workspace.name;
        return gsClient.datastores(wsName);
    })
    .then(function(data){
        console.log("got " + data.dataStores.dataStore.length + " ds");
        return gsClient.datastore(wsName, data.dataStores.dataStore[0].name);
    })
    .then(function(data){
        console.log("got details of " + data.dataStore.name + " ds");
        console.log(data);
    })
    .fail(function(err){
        console.error(err);
    });
