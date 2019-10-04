let config = require('./config.json');
let express = require('express');
let app = express();
let port = config.server.port;
let fs = require('fs');
let mongo = require("mongodb").MongoClient;
let ObjectID = require('mongodb').ObjectID;
let cors = require("cors");
let nodemailer = require('nodemailer');
let multer = require('multer');

let http = require('http');
let https = require('https');

//ssl credentials for https

let privateKey = fs.readFileSync(config.server.sslKeyPath, 'utf8');
let certificate = fs.readFileSync(config.server.sslCertPath, 'utf8');
let chain = fs.readFileSync(config.server.sslChainPath, 'utf8');
let httpsCredentials = {
    key: privateKey,
    cert: certificate,
    ca: chain
};
//config part
let allowIps = config.admin.ips;

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.originalUrl == "/updateAlbum" || req.originalUrl == "/addNewAlbum") {
            let collName = req.body.collection;
            let path = "/images/" + collName;
            cb(null, __dirname + path)
        } else if (req.originalUrl == "/updateStory" || req.originalUrl == "/addNewStory") {

            cb(null, __dirname + "/images/storyImages/main")
        } else if (req.originalUrl == "/addNewCity") {
            let collName = req.body.album;
            let path = "/images/" + collName;
            cb(null, __dirname + path)
        } else if (req.originalUrl == "/updateAbout") {

            cb(null, __dirname + "/images")
        } else if (req.originalUrl == "/updateImages") {
            let collName = req.body.collection;
            let city = req.body.city;
            let path = "/images/" + collName + "/" + city;
            cb(null, __dirname + path)
        } else {                           //You can add any other if else for your different request

            cb(null, __dirname + '/uploads')
        }
    },
    filename: function (req, file, cb) {
        let words = file.mimetype.split("/");
        let type = words[words.length - 1];
        cb(null, file.fieldname + '-' + Date.now() + '.' + type);
    }
});

let upload = multer({storage: storage})

app.use(cors());

app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/adminPanel', express.static(__dirname + '/adminPanel/'));
app.use('/images', express.static(__dirname + '/images/'));


let httpServer = http.createServer(app);
httpServer.listen(port+1);

let httpsServer = https.createServer(httpsCredentials, app);
httpsServer.listen(port);

app.get('/admin', function (req, res) {
    if (checkIfAdmin(req)) {
        res.sendFile(__dirname + '/adminPanel/admin.html');
    } else {
        let ip = getIp(req);
        res.send("access denied from " + ip);
    }
});

function getIp(req) {
    let unparsedIps = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',')[0].trim();
    let ips = unparsedIps.split(':');
    let ip = ips[ips.length - 1];
    return ip;
}

function checkIfAdmin(req) {
    let ip = getIp(req);
    //return allowIps.includes(ip);
    return true;
}

mongo.connect(config.server.mongoAddress, {useNewUrlParser: true}, function (err, client) {
    if (err) {
        console.log("cant connect to server");
        return;
    } else {
        console.log("connected to DB");
    }


    let db = client.db(config.server.database);

    app.get('/findCity', function (req, res) {
        let collName = req.query.collection;
        let obj = {};

        let coll = db.collection(collName);
        coll.find(obj).toArray(function (err, result) {
            res.send(result);
        });

    });

    app.get('/findAlbums', function (req, response) {

        let coll = db.collection("albums");
        coll.find({}).toArray(function (err, result) {

            response.send(result);
        })

    });

    app.get('/findStory', function (req, res) {
        let coll = db.collection("stories");
        coll.find({}).toArray(function (err, result) {
            res.send(result);
        })
    });

    app.get('/findReview', function (req, res) {
        let coll = db.collection("reviews");
        coll.find({}).toArray(function (err, result) {
            res.send(result);
        })
    });

    app.get('/findAbout', function (req, res) {
        let coll = db.collection("about");
        coll.find({}).toArray(function (err, result) {
            res.send(result);
        })
    });

    app.get('/findImages', function (req, res) {
        let collName = req.query.collection;
        let album = req.query.album;
        let obj = {
            name: album
        };

        let coll = db.collection(collName);
        coll.find(obj).toArray(function (err, result) {
            res.send(result);
        });

    });


    app.post("/updateAlbum", upload.single("image"), function (req, res) {
        let filename = req.file.filename;
        let name = req.body.name;
        let collName = req.body.collection;
        let path = "./images/" + collName;
        let id = req.body.id;
        let collection = db.collection(collName);
        var myquery = {'_id': ObjectID(id)};
        var newvalues = {$set: {name: name, cityImage: path + "/" + filename}};
        collection.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
        });
    });


    app.post("/updateStory", upload.single("image"), function (req, response) {
        let filename = req.file.filename;
        let title = req.body.title;
        let text = req.body.text;
        let path = "images/storyImages/main";
        let id = req.body.id;
        let collection = db.collection("stories");
        var myquery = {'_id': ObjectID(id)};
        var newvalues = {$set: {title: title, text: text, image: path + "/" + filename}};
        response.send("");
        collection.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            response.send("");
        });

    });


    app.get("/updateReview", function (req, res) {

        let id = req.query.id;
        let name = req.query.name;
        let text = req.query.text;

        let collection = db.collection("reviews");
        var myquery = {'_id': ObjectID(id)};
        var newvalues = {$set: {name: name, text: text}};
        collection.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
        });
    });


    app.post("/updateAbout", upload.single("image"), function (req, res) {
        let filename = req.file.filename;
        let name = req.body.name;
        let text = req.body.text;
        let path = "./images";
        let id = req.body.id;
        let mission = req.body.mission;
        let collection = db.collection("about");
        var myquery = {'_id': new ObjectID(id)};
        var newvalues = {$set: {name: name, image: path + "/" + filename, text: text, mission: mission}};
        collection.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
        });
    });


    app.get('/findContact', function (req, res) {
        let coll = db.collection("contact");
        coll.find({}).toArray(function (err, result) {
            res.send(result);
        })
    });

    app.get("/updateContact", function (req, res) {

        let id = req.query.id;
        let facebook = req.query.facebook;
        let email = req.query.email;
        let phone = req.query.phone;

        let collection = db.collection("contact");
        var myquery = {'_id': ObjectID(id)};
        var newvalues = {$set: {facebook: facebook, email: email, phone: phone}};
        collection.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
        });
    });

    app.post("/addNewStory", upload.single("image"), function (req, response) {

        let filename = req.file.filename;
        let title = req.body.title;
        let text = req.body.text;
        let path = "images/storyImages/main";

        let collection = db.collection("stories");

        var newvalues = {title: title, text: text, image: path + "/" + filename};
        collection.insertOne(newvalues, function (err, res) {
            if (err) throw err;
            response.send("");
        });
    });


    app.post("/addNewCity", upload.single("image"), function (req, response) {

        let album = req.body.album;
        let filename = req.file.filename;
        let name = req.body.name;

        let path = "./images/" + album;

        let collection = db.collection(album);

        var newvalues = {name: name, cityImage: path + "/" + filename, images: []};
        collection.insertOne(newvalues, function (err, res) {
            if (err) throw err;
            response.send("success");
        });
    });

    app.get("/addNewReview", function (req, response) {

        let name = req.query.name;
        let text = req.query.text;


        let collection = db.collection("reviews");

        var newvalues = {name: name, text: text};
        collection.insertOne(newvalues, function (err, res) {
            if (err) throw err;
            response.send("success");
        });

    });

    app.get("/addNewAlbum", function (req, response) {

        let album = req.query.album;
        let obj = {
            name: album,
            collName: album
        }
        let dir = './images/' + album;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        let coll = db.collection("albums");
        coll.insertOne(obj, function (err, res) {
            if (err) throw err;
        });
        db.createCollection(album, function (err, res) {
            if (err) throw err;
        });

        response.send("success");
    });

    /*
    do it by sending id as you did with others
     */
    app.get("/deleteAlbum", function (req, response) {

        let id = req.query.id;
        let collName = req.query.collection;
        let collection = db.collection("albums");
        let myquery = {'_id': new ObjectID(id)};

        collection.removeOne(myquery, function (err, res) {
            if (err) throw err;

        });
        db.collection(collName).drop(function (err, res) {
            if (err) throw err;


        })
        response.send("success");
    });


    app.get("/deleteStory", function (req, res) {

        let id = req.query.id;
        let collection = db.collection("stories");
        var myquery = {'_id': new ObjectID(id)};

        collection.deleteOne(myquery, function (err, res) {
            if (err) throw err;

        });
        res.send("success");
    });

    app.get("/deleteReview", function (req, res) {

        let id = req.query.id;
        let collection = db.collection("reviews");
        var myquery = {'_id': new ObjectID(id)};

        collection.remove(myquery, function (err, res) {
            if (err) throw err;
        });
        res.send("success");
    });

    app.get("/deleteCity", function (req, res) {

        let id = req.query.id;
        let album = req.query.album;
        let collection = db.collection(album);
        var myquery = {'_id': new ObjectID(id)};

        collection.deleteOne(myquery, function (err, res) {
            if (err) throw err;

        });
        res.send("success");
    });

    app.get("/test", function (req, res) {
        res.send("test");
    })

    app.post("/updateImages", upload.single("image"), function (req, res) {
        let filename = req.file.filename;
        let city = req.body.city;
        let collName = req.body.collection;
        let path = "images/" + collName + "/" + city;
        let id = req.body.id;
        let collection = db.collection(collName);
        var myquery = {'_id': ObjectID(id)};
        var newvalues = {$addToSet: {"images": path + "/" + filename}};
        collection.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
        });
    });


    app.get('/postMessage', function (req, res) {
        let collection = "contactFormMessages";
        let firstName = req.query.firstName;
        let lastName = req.query.lastName;
        let phone = req.query.phone;
        let email = req.query.email;
        let message = req.query.message
        if (firstName == undefined || phone == undefined) {
            res.send("First Name and Phone Number Required");
            return;
        }
        let obj = {
            "firstName": firstName,
            "lastName": lastName,
            "phone": phone,
            "email": email,
            "message": message
        };
        let coll = db.collection(collection);
        coll.insertOne(obj);
        res.send();

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.mail.from,
                pass: config.mail.pass
            }
        });

        let sendText = '<p>Name: ' + firstName + " " + lastName + '</p></n><p>Phone: ' + phone + '</p></n><p>Email: ' + email + '</p></n> Message: ' + message + '</p>';

        var mailOptions = {
            from: config.mail.from,
            to: config.mail.to,
            subject: 'New contact message from website',
            html: sendText
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    })

    app.get("/deleteCityImage", function (req, res) {

        let index = req.query.index;
        let collName = req.query.collection;
        let id = req.query.id;
        let collection = db.collection(collName);
        var myQuery = {'_id': ObjectID(id)};
        let imageNumber = "images." + index;
        let removeQuery = {$set: {}};
        removeQuery['$set'][imageNumber] = null;
        collection.updateOne(myQuery, removeQuery, function (err, res) {
            if (err) throw err;
            collection.updateOne(myQuery, {$pull: {"images": null}});
        });
    });

    app.get("/updateAlbumName", function (req, response) {
        let collName = req.query.collection;
        let newName = req.query.name;
        let collection = db.collection("albums");
        let myQuery = {"collName": collName};
        let newQuery = {$set: {"name": newName}};
        collection.updateOne(myQuery, newQuery, function (err, res) {
            if (err) throw err;
            response.send();
        })


    });


});

