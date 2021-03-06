const express = require('express');
const app = express();
const port = process.env.PORT || 8001
const database = require('./db');

app.use(express.urlencoded({extended: true}));
app.use(express.json());


//purpose of this is to enable cross domain requests
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use("/",express.static(__dirname + "/front"));
app.use("/",express.static(__dirname + "/images"));

require('./routs')(app, database);


app.listen(port, function (err) {
    if (err) console.log('error', err);

    console.log("Server listening on port " + port)
});
