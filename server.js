let express = require('express');
let app = express();
let port = 3000;
let fs = require('fs');
let mongo = require("mongodb").MongoClient;
let mongodb = require("mongodb");
let cors= require("cors");
let nodemailer = require('nodemailer');

app.use(cors());


app.listen(port, function () {
    console.log("server is working")
});

mongo.connect("mongodb://localhost:27017", function (err, client) {
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
        let collection= req.query.collection;
        let firstName= req.query.firstName;
        let lastName= req.query.lastName;
        let phone= req.query.phone;
        let email= req.query.email;
        let message= req.query.message
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
                user: 'tactravelwebsite@gmail.com',
                pass: 'America123!'
            }
        });

        let sendText = '<p>Name: ' + firstName +" " + lastName +'</p></n><p>Phone: ' + phone +'</p></n><p>Email: ' +email +'</p></n> Message: ' +message +'</p>';

        var mailOptions = {
            from: 'tactravelwebsite@gmail.com',
            to: 'travelagentchristy@gmail.com',
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

