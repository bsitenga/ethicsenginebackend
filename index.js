const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const app = express();
let Preferences = require('./models/preferences');
let Summary = require('./models/summary');

require('dotenv').config();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
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

//Adds one user's preferences to the db
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

//Updates the average of user preferences
app.post('/summary', function (req, res) {
    const util = req.body.util;
    const action = req.body.action;
    const known = req.body.known;
    const pedestrians = req.body.pedestrians;

    //Finds the current Summary averages
    const query = Summary.where({ name: 'summary' });
    query.findOne(function (err, allPrefs) {
        if (err) return handleError(err);
        if (allPrefs) {
            //Recalculates user preference averages
            let pTotal = allPrefs.total + 1;
            let pUtil = (Number(allPrefs.util) * Number(allPrefs.total) + Number(util)) / pTotal;
            let pAction = (Number(allPrefs.action) * Number(allPrefs.total) + Number(action)) / pTotal;
            let pKnown = (Number(allPrefs.known) * Number(allPrefs.total) + Number(known)) / pTotal;
            let pPedestrians = (Number(allPrefs.pedestrians) * Number(allPrefs.total) + Number(pedestrians)) / pTotal;

            //Updates the current summary averages
            Summary.findOneAndUpdate({ name: "summary" }, {
                total: pTotal,
                util: pUtil,
                action: pAction,
                known: pKnown,
                pedestrians: pPedestrians
            }, function () {
                return res.json('Summary updated!')
            })
        }
    });
})

// Catchall for any request that doesn't
// match one above: sends back error message
app.get('*', (req, res) => {
    res.send("CATCHALL ERROR: UNKNOWN ROUTE");
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Ethics Engine listening on ${port}`);