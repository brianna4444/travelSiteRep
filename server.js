let config = require('./config.json');
let express = require('express');
let app = express();
let port = config.server.port;
let fs = require('fs');
let mongo = require("mongodb").MongoClient;
let mongodb = require("mongodb");
let cors= require("cors");
let nodemailer = require('nodemailer');
let multer= require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.originalUrl == "/updateAlbum"){
            let collName= req.body.collection;
            let path= "/images/" + collName;
            cb(null, __dirname+ path)
        }
        else if (req.originalUrl == "/updateStory"){
            cb(null, __dirname+'/uploads/stories')
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
    })

    app.get('/findReview', function (req,res) {
        let coll = db.collection("reviews");
        coll.find({}).toArray(function (err, result) {
            res.send(result);
        })
    })

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


        app.post("/updateAlbum", upload.single("image"), function (req, res) {

            let filename = req.file.filename;
            let name = req.body.name;
            let collName = req.body.collection;
            let path= "/images/" + collName;
            let id = req.body.id;
            let collection = db.collection(collName);

            var myquery = {'_id':ObjectID(id)};
            var newvalues = { $set: {name: name, cityImage: __dirname+ path + "/" + filename} };
            collection.updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
            });
        });






    })
});

