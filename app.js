const config = require('./config.json');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./utils/dbUtils');


const app = express();

// Set up connection of database
db.setUpConnection();

// Parse the text as JSON
app.use( bodyParser.json() );
// Allow requests from any origin
app.use( cors({ origin: '*' }) );

//
// RESTful api handlers
//

// Test
app.get('/', function (req, res) {
  res.send('Hello!');
});

//
//  Categories
//


// Get Categories Names
app.get('/categories', (req, res) => {
  db.listCategories().then(data => res.send(data));
});

// Delete Category
app.delete('/category/:id', (req, res) => {
  db.deleteCategory(req.params.id).then(data => res.send(data));
});

// Create Category
app.post('/category/', (req, res) => {
  db.createCategory(req.body).then(data => res.send(data));
});



//
//  Products
//

// Get Products in given Category
app.get('/products/:id', (req, res) => {
  db.listProducts(req.params.id).then(data => res.send(data));
});

// Delete Product
app.delete('/product/:id', (req, res) => {
  db.deleteProduct(req.params.id).then(data => res.send(data));
});

// Create Product
app.post('/product/create/:id', (req, res) => {
  db.createProduct(req.params.id, req.body).then(data => res.send(data));
});

// Modify Product
app.post('/product/update/:id', (req, res) => {
  db.updateProduct(req.params.id, req.body).then(data => res.send(data));
});


const server = app.listen(config.serverPort, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Express Server is running on host ${host} and port ${port}.`);
});
