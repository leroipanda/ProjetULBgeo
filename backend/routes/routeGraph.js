var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://nath:test@cluster0-ctjry.mongodb.net/test?retryWrites=true&w=majority";

var dbo ;
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    dbo = db.db("mydb");
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    dbo.collection("graph").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);

    });

});

router.put('/', function(req, res, next) {
    dbo.collection("graph").insertOne(req.body, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted ");

    });

    console.log(req.body);
    res.send('respond with a resource');
});

router.post('/:id', function(req, res, next) {
    dbo.collection("graph").updateOne({_id : new mongoose.mongo.ObjectId(req.params.id) }, {$set: {record : req.body.record}   },  function(err, res) {
        if (err) {
            console.log("here");
            throw err;
        }
        console.log("1 document updated " ,req.body.record  );

    });

    console.log("update ");
    res.send('respond with a resource');
});

module.exports = router;