let nameColl= "mexicoBtn";
let cityName= "Cabo San Lucas";
let cityImage= "images/mexicoBtn/CaboSanLucas";
let images = [];

let mongo = require("mongodb").MongoClient;
let mongodb = require("mongodb");
let fs = require('fs');

mongo.connect("mongodb://localhost:27017", function (err, client) {
    if (err) {
        console.log("cant connect to server");
        return;
    }

    let db = client.db("config");
    let coll = db.collection(nameColl);
    fs.readdirSync(cityImage).forEach(file => {
        console.log(file);
        if (file !== ".DS_Store"){
            images.push(cityImage + "/" + file);
        }
    });

    let obj= {
        "name": cityName,
        "cityImage": images[0],
        "images": images
    }

    coll.insertOne(obj);

client.close();
})