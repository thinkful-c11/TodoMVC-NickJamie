'use strict';

const express = require('express');
const { DATABASE, PORT } = require('./config');

const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(bodyParser.json());

// function rootPath(req, res, next) {
//   res.root = `${req.protocol}://${req.get('host')}/api/items/`;
//   next();
// }

// app.use(rootPath);

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
//   next();
// });

// Add middleware and .get, .post, .put and .delete endpoints
// app.get('/', (req, res) => {
//   res.json({});
// });

// app.get('/api/items', (req, res) => {
//   res.json([]);
// });

// app.post('/api/items', function (req, res) {
//   const newItem = {title: 'Walk the dog'};
//   res.header('location', '/api/items');
//   res.status(201).json(newItem);
// });


// app.get('/api/items', (req, res) => {
//   knex.select()
//     .from('items')
//     .then(results => res.json(results));
// });

// app.get('/api/items/:id', (req, res) => {
//   knex.select()
//     .from('items')
//     .where('id', req.params.id)
//     .then(results => res.json(results[0]));

// app.post('/api/items', (req, res) => {
//   const newItem = { title: 'Walk the dog' };
//   knex.insert(newItem)
//   .into('items')
//   .returning('id')
//   .then(results => {
//     res.status(201);
//     res.json({id: results[0]});
//   });
// });

<<<<<<< HEAD
app.post('/api/items', (req,res) => {
  const newItem = { title: 'Buy milk' };
  knex.insert(newItem)
  .into('items')
  .returning('id')
  .then(results => {
    res.status(201);
    //console.log('RESULTS HERE', `http${results[0]}`);
    res.json({url: `http://api/items${results[0]}`});
  });
});













=======
// app.post('/api/items', jsonParser, (req, res) => {
//   const newItem = { title: 'Buy milk' };
//   knex.insert(newItem)
//   .into('items')
//   .returning(['id'])
//   .then(results => {
//     console.log('RESULTS HERE', `http://api/items/?id=${results[0]}`);
//     const item = results[0];
//     item.url = `${res.root}${results[0].id}`;
//     res.status(201).location(item.url).json(item);
//     // res.json({url: `http://api/items/${results[0]}`});
//   });
// });
>>>>>>> c69dba0c2055606d66661a1cd772d54f44215177

// app.post('/api/items', (req, res) => {
//   if (!req.body.title) {
//     return res.status(400).send('Missing title in body request.');
//   }
//   knex
//     .insert({title: req.body.title})
//     .into('items')
//     .returning(['id'])
//     .then(result => {
//       const URL = `${req.protocol}://${req.get('host')}/api/items/${result[0].id}`;
//       res.status(201);
//       res.location(URL);
//       res.json(Object.assign({}, { url: URL } )); 
//     });
// });

app.post('/api/items', (req, res) => {
  if (!req.body.title) {
    return res.status(400).send(`Missing title in body request.`);
  }
  console.log('This sucks so much');
  knex
    .insert({title: req.body.title})
    .into('items')
    .returning(['id', 'title'])
    .then(result => {
      const URL = `${req.protocol}://${req.hostname}:${PORT}/api/items/${result[0].id}`;
      res.status(201);
      res.location(URL);
      res.json(Object.assign({}, result[0], { url: URL } )); 
    });
});



let server;
let knex;
function runServer(database = DATABASE, port = PORT) {
  return new Promise((resolve, reject) => {
    try {
      console.log(database);
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