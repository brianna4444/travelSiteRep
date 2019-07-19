let config = require('./config.json');
let express = require('express');
let app = express();
let port = config.server.port;
let fs = require('fs');
let mongo = require("mongodb").MongoClient;
let ObjectID = require('mongodb').ObjectID;
let mongodb = require("mongodb");
let cors= require("cors");
let nodemailer = require('nodemailer');
let multer= require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.originalUrl == "/updateAlbum" || req.originalUrl== "/addNewAlbum"){
            let collName= req.body.collection;
            let path= "/images/" + collName;
            cb(null, __dirname+ path)
        }
        else if (req.originalUrl == "/updateStory" || req.originalUrl == "/addNewStory"){

            cb(null, __dirname+ "/images/storyImages/main")
        }
        else if (req.originalUrl == "/addNewCity"){
            let collName= req.body.collection;
            let path= "/images/" + collName;
            cb(null, __dirname+ path)
        }
        else if (req.originalUrl == "/updateAbout"){

            cb(null, __dirname+ "/images")
        }
        else{                           //You can add any other if else for your different request

            cb(null, __dirname+'/uploads')
        }
    },
    filename: function (req, file, cb) {
        let words = file.mimetype.split("/");
        let type = words[words.length-1];
        cb(null, file.fieldname + '-' + Date.now()+'.'+type);
    }
});

var upload = multer({ storage: storage })

app.use(cors());


app.listen(port, function () {
    console.log("server is working")
});

mongo.connect(config.server.mongoAddress, function (err, client) {
    if (err) {
        console.log("cant connect to server");
        return;
    }




    let db = client.db("config");

    app.get('/findCity', function (req, res) {
        let collName = req.query.collection;
        let obj = {};

        let coll = db.collection(collName);
        coll.find(obj).toArray(function (err, result) {
            res.send(result);
        });

    });

    app.get('/findStory', function (req,res) {
        let coll = db.collection("stories");
        coll.find({}).toArray(function (err, result) {
            res.send(result);
        })
    });

    app.get('/findReview', function (req,res) {
        let coll = db.collection("reviews");
        coll.find({}).toArray(function (err, result) {
            res.send(result);
        })
    });

    app.get('/findAbout', function (req,res) {
        let coll = db.collection("about");
        coll.find({}).toArray(function (err, result) {
            res.send(result);
        })
    });

    app.get('/findImages', function (req, res) {
        let collName = req.query.collection;
        let album= req.query.album;
        let obj = {
            name: album
        };

        let coll = db.collection(collName);
        coll.find(obj).toArray(function (err, result) {
            res.send(result);
        });

    });


    app.post("/updateAlbum", upload.single("image"), function (req, res) {
        console.log(1);
        let filename = req.file.filename;
        let name = req.body.name;
        let collName = req.body.collection;
        let path= "./images/" + collName;
        let id = req.body.id;
        let collection = db.collection(collName);
        var myquery = {'_id':ObjectID(id)};
        var newvalues = { $set: {name: name, cityImage: path + "/" + filename} };
        collection.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
        });
    });


    app.post("/updateStory", upload.single("image"), function (req, res) {

        let filename = req.file.filename;
        let title = req.body.title;
        let text= req.body.text;
        let path= "images/storyImages/main";
        let id = req.body.id;
        let collection = db.collection("stories");
        var myquery = {'_id':ObjectID(id)};
        var newvalues = { $set: {title: title, text: text, image: path + "/" + filename} };
        collection.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
        });
    });


    app.get("/updateReview", function (req, res) {

        let id = req.query.id;
        let name = req.query.name;
        let text= req.query.text;

        let collection = db.collection("reviews");
        var myquery = {'_id':ObjectID(id)};
        var newvalues = { $set: {name: name, text: text} };
        collection.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
        });
    });


    app.post("/updateAbout", upload.single("image"), function (req, res) {

        let filename = req.file.filename;
        let name = req.body.name;
        let text= req.body.text;
        let path= "./images";
        let id = req.body.id;
        let mission= req.body.mission;
        let collection = db.collection("about");
        var myquery = {'_id': new ObjectID(id)};
        var newvalues = { $set: {name: name, image: path + "/" + filename, text: text, mission: mission} };
        collection.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
        });
    });


    app.get('/findContact', function (req,res) {
        let coll = db.collection("contact");
        coll.find({}).toArray(function (err, result) {
            res.send(result);
        })
    });

    app.get("/updateContact", function (req, res) {

        let id = req.query.id;
        let facebook = req.query.facebook;
        let email= req.query.email;
        let phone= req.query.phone;

        let collection = db.collection("contact");
        var myquery = {'_id':ObjectID(id)};
        var newvalues = { $set: {facebook: facebook, email: email, phone: phone} };
        collection.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
        });
    });

    app.post("/addNewStory", upload.single("image"), function (req, res) {

        let filename = req.file.filename;
        let title = req.body.title;
        let text= req.body.text;
        let path= "images/storyImages/main";

        let collection = db.collection("stories");

        var newvalues = {title: title, text: text, image: path + "/" + filename} ;
        collection.insertOne(newvalues, function(err, res) {
            if (err) throw err;
        });
    });


    app.post("/addNewCity", upload.single("image"), function (req, res) {

        let filename = req.file.filename;
        let title = req.body.title;
        let text= req.body.text;
        let path= "images/storyImages/main";
        let id = req.body.id;
        let collection = db.collection("stories");
        var myquery = {'_id':new ObjectID(id)};
        var newvalues = { $set: {title: title, text: text, image: path + "/" + filename} };
        collection.insertOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
        });
    });

    app.get("/addNewReview", function (req, res) {

        let name = req.query.name;
        let text = req.query.text;


        let collection = db.collection("reviews");

        var newvalues = {name: name, text: text};
        collection.insertOne(newvalues, function(err, res) {
            if (err) throw err;

        });
        res.send("success");
    });

    app.get("/addNewAlbum", function (req, res) {

        let album = req.query.album;

        db.createCollection(album, function(err, res) {
            if (err) throw err;

        });
        res.send("success");
    });

    /*
    do it by sending id as you did with others
     */
    app.get("/deleteAlbum", function (req, res) {

        let album = req.query.album;


        db.collection.remove(album, function(err, res) {
            if (err) throw err;

        });
        res.send("success");
    });


    app.get("/deleteStory", function (req, res) {

        let id = req.query.id;
        let collection = db.collection("stories");
        var myquery = {'_id':new ObjectID(id)};

        collection.deleteOne(myquery, function(err, res) {
            if (err) throw err;

        });
        res.send("success");
    });

    app.get("/deleteReview", function (req, res) {

        let id = req.query.id;
        let collection = db.collection("reviews");
        var myquery = {'_id':new ObjectID(id)};

        collection.remove (myquery, function(err, res) {
            if (err) throw err;

        });
        res.send("success");
    });

    app.get("/deleteCity", function (req, res) {

        let id = req.query.id;
        let album= req.query.album;
        let collection = db.collection(album);
        var myquery = {'_id':new ObjectID(id)};

        collection.deleteOne (myquery, function(err, res) {
            if (err) throw err;

        });
        res.send("success");
    });



    app.get('/postMessage', function (req,res){
        let collection= "contactFormMessages";
        let firstName= req.query.firstName;
        let lastName= req.query.lastName;
        let phone= req.query.phone;
        let email= req.query.email;
        let message= req.query.message
        if (firstName == undefined || phone == undefined){
            res.send("First Name and Phone Number Required");
            return;
        }
        let obj={
            "firstName": firstName,
            "lastName": lastName,
            "phone": phone,
            "email": email,
            "message": message
        };
        let coll= db.collection(collection);
        coll.insertOne(obj);
        res.send();

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.mail.from,
                pass: config.mail.pass
            }
        });

        let sendText = '<p>Name: ' + firstName +" " + lastName +'</p></n><p>Phone: ' + phone +'</p></n><p>Email: ' +email +'</p></n> Message: ' +message +'</p>';

        var mailOptions = {
            from: config.mail.from,
            to: config.mail.to,
            subject: 'New contact message from website',
            html: sendText
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    })
});

