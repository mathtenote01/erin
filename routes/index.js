const { json } = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);
  console.log('Connect correctly to server');
  const db = client.db(dbname);
  const collection = db.collection('dishes');
  collection.insertOne({"name":"Uthappizza", "description":"test"},(err,result)=>{
   assert.strictEqual(err, null);
   console.log('After Insert:\n');
   console.log(result.ops);
   collection.find({}).toArray((err, docs) => {
      assert.strictEqual(err, null);
      console.log('Found:\n');
      console.log(docs);

      db.dropCollection('dishes', (err, result) => {
        assert.strictEqual(err, null);

        client.close();
      });
   });
  });
});
const fs = require('fs');
const jsonObject = JSON.parse(fs.readFileSync('/Users/fujiidaiki/Documents/myapp/routes/json/test.json', 'utf8'));
var express = require('express');
var router = express.Router();
const {PythonShell} = require('python-shell');
var testdata = require('/Users/fujiidaiki/Documents/myapp/routes/json/test.json');
var options = {
    mode: json,
    pythonPath: '/Users/fujiidaiki/Library/Python/3.7/lib/python' ,
    //pythonPath: '/Users/fujiidaiki/Library/Frameworks/Python.framework/Versions/3.7/Resources/Python.app/Contents/MacOS/Python'
    pythonOptions: ['-u'],
    scriptPath: '/Users/fujiidaiki/Documents/myapp/routes/py_node/test.py'
};

var pyshell = new PythonShell('/Users/fujiidaiki/Documents/myapp/routes/py_node/test.py', {mode: 'json'});
var jsonObje = {
    "a": "4",
    "b": "12",
    "c": "8",
};
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Ok");
  // pyshell.send(jsonObje)
  // pyshell.send(testdata)
  pyshell.on('message', data => {
    console.log('Hello');
    console.log(data);
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
