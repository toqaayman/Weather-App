/* Dependencies */
const bodyParser = require('body-parser')
const cors = require('cors');
// Require Express to run server and routes
const express = require('express');
const app = express();
// Setup empty JS object to act as endpoint for all routes
projectData = {};

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, () => {console.log(`http://localhost:${port}`)})

// GET
app.get('/ALL', function(request, response) {
  response.send(projectData);
});

// POST
app.post('/', function(request, response) {
    projectData.date = request.body.date;
    projectData.temp = request.body.main.temp;
    projectData.feelings = request.body.feelings;
    response.send(projectData);
});