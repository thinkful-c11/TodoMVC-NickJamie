'use strict';

const express = require('express');
const { DATABASE, PORT } = require('./config');

const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  next();
});

// Add middleware and .get, .post, .put and .delete endpoints
app.get('/', (req, res) => {
  res.send('hello world!');
});

app.get('/api/items', (req, res) => {
  res.json([]);
});

app.post('/api/items', function (req, res) {
  const newItem = {title: 'Walk the dog'};
  res.header('location', '/api/items');
  res.status(201).json(newItem);
});




let server;
let knex;
function runServer(database = DATABASE, port = PORT) {
  return new Promise((resolve, reject) => {
    try {
      knex = require('knex')(database);
      server = app.listen(port, () => {
        console.info(`App listening on port ${server.address().port}`);
        resolve();
      });
    }
    catch (err) {
      console.error(`Can't start server: ${err}`);
      reject(err);
    }
  });
}

function closeServer() {
  return knex.destroy().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing servers');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => {
    console.error(`Can't start server: ${err}`);
    throw err;
  });
}

module.exports = { app, runServer, closeServer };