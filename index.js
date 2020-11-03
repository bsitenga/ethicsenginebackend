const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

let jsonParser = bodyParser.json();

app.use(cors({origin: true, credentials: true}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


//ALL API ENDPOINTS BELOW 
//test endpoint for heroku
app.get('/', function(req, res) {
    res.send("Hello Heroku");
  })