const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const app = express();
let Preferences = require('./models/preferences');

require('dotenv').config();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

//ALL API ENDPOINTS BELOW 
//test endpoint for heroku
app.get('/', function (req, res) {
    res.send("Hello Heroku");
})

app.post('/preferences', function (req, res) {
    const util = req.body.util;
    const action = req.body.action;
    const known = req.body.known;
    const pedestrians = req.body.pedestrians;
    const newPreferences = new Preferences({
        util,
        action,
        known,
        pedestrians
    })

    newPreferences.save()
        .then(() => res.json('Preferences added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

// Catchall for any request that doesn't
// match one above: sends back error message
app.get('*', (req, res) => {
    res.send("CATCHALL ERROR: UNKNOWN ROUTE");
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Ethics Engine listening on ${port}`);