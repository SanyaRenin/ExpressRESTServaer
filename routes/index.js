var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/conFusion';
const dbname = 'conFusion';

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {

	assert.equal(err,null);

	console.log('Connected correctly to server');

	const db = client.db(dbname);
	const collection = db.collection("dishes");
	collection.insertOne({"name": "Alex", "description": "test message 1"},
		(err, result) => {
			assert.equal(err,null);

			console.log("After Insert:\n");
			console.log(result.ops);

			collection.find({}).toArray((err, docs) => {
				assert.equal(err,null);

				console.log("Found:\n");
				console.log(docs);
				client.close()
				// db.dropCollection("dishes", (err, result) => {
				// 	assert.equal(err,null);
				//
				// 	client.close();
				// });
			});
		});

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
