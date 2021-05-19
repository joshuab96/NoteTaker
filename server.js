//getting dependancies
const express = require("express");
const path = require("path");
const fs = require('fs');

//setting up express and port + uses enviromnent port otherwise uses the port specified
const app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

fs.readFile('./db/db.json', 'utf8', (error, data) =>
    error ? console.error(error) : console.log(data)
);



//serve static files
app.use(express.static('public'))

//routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html'))); //Homepage 

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html'))); //Notes page

app.get('/api/notes', (req, res) => {  //reads data form db.json file and returns the data to /api/notes

    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        error ? console.error(error) : console.log(data)
        res.json(data)
    }
    );

});


//convert string to javascript object when read. the string is DATA variable.

//listening to server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
