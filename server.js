//dependencies
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const csv = require('csvtojson')

// import for index route
const index = require('./server/routes/app');

// imports for additional route files
const candidateRoutes = require('./server/routes/candidates');
const countyRoutes = require('./server/routes/counties');

// connect to mongo database
mongoose.connect('mongodb://localhost:27017/voter-guide',
  { useNewUrlParser: true }, (err, res) => {
    if (err) {
      console.log('Connection failed: ' + err);
    }
    else {
      console.log('Connected to database!');
    }
  }
);

// create an instance of express
const app = express(); 

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// CORS support
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// set root directory
app.use(express.static(path.join(__dirname, 'dist/voterGuide')));

// set / route to index page
app.use('/', index);

//set additional routes
app.use('/candidates', candidateRoutes);
app.use('/counties', countyRoutes);

// set non-defined routes back to the index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Set the port address 
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function () {
  console.log('API running on localhost: ' + port);
});