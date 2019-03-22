let express = require('express');
let app = express();
let port = 3000;
let fs = require('fs');
let mongo = require("mongodb").MongoClient;
let mongodb = require("mongodb");
let cors= require("cors");

app.use(cors());


app.listen(port, function () {
    console.log("server is working")
});

mongo.connect("mongodb://localhost:27017", function (err, client) {
    if (err) {
        console.log("cant connect to server");
        return;
    }

    let db = client.db("travel");

    app.get('/search', function (req, res) {
        let collName = req.query.collection;
        let album = req.query.album;
        let obj = {};
        if (album && album!=""){
            obj['name'] = album;
        }

        let coll = db.collection(collName);
        coll.find(obj).toArray(function (err, result) {
            res.send(result);
        });

    });
});
