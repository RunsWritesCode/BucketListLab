const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const express = require('express');
const server = express();

server.use(parser.json());
server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if (err) {console.log(err); return;}
  const db = client.db('countries');
  console.log('connected to db');


  server.post('/api/countries', function(req, res) {
    db.collection('countries').save(req.body, function(err, result) {
      if(err){console.log(err);
        res.status(500);
        res.send();
      }
      res.status(201);
      res.json(result.ops[0]);
      console.log('saved to db');
    });
  });

  server.get('/api/countries', function(req, res) {
    db.collection('countries').find().toArray(function (err, result) {
      if(err){console.log(err);
        res.status(500);
        res.send();
      }
      res.status(200);
      res.json(result);
      console.log('all items returned');
    })
  })

  server.delete('/api/countries', function(req, res){
      db.collection("countries").deleteMany(function(err, result){
        if(err){
          console.log(err);
          res.status(500);
          res.send();
        }
        // res.json(result);
        res.status(204);
        res.send();
        console.log("All items deleted");

      })
    })

  server.listen(3000, function() {
    console.log('app is listening on port 3000');
  })

});
