const bodyParser = require("body-parser");
const cors = require('cors');
const express = require('express');
const { send } = require("process");

// Setup empty JS object to act as endpoint for all routes
projectData = {
    date: "12.25.2020",
    temp: -6.3,
    feeling: "i am feeling good"
};

// Require Express to run server and routes

// Start up an instance of app
const app = express()

/* Middleware*/
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json());
app.use(cors());


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;

const server = app.listen(port, listening);

function listening() {
    console.log(`server running on port ${port}`);
}

data = {};

app.get('/',(req, res)=> {
    res.send(projectData)
});

app.post('/addData',(req, res)=> {
    // data.length = 0;
    newEntry = {
        date: req.body.date,
        temp: req.body.temp,
        feeling: req.body.feeling
    }
    data = newEntry;
    res.send(data);
    // console.log(data);      
})

app.get('/all',(req, res)=> {
    res.send(data)
});
