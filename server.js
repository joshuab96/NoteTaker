//dependancies
const express = require("express");
const path = require("path");
const fs = require('fs');


//setting up express and port + uses enviromnent var port otherwise uses the port specified
const app = express();
var PORT = process.env.PORT || 3001;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//serve static files in the public folder
app.use(express.static('public'))


//HTML Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html'))); //Homepage 
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html'))); //Notes page



//API Routes
app.post('/api/notes/', (req, res) => {
    console.log("----------------------------POST API NOTES----------------------------------------")
    const newnote = req.body;
    newnote.id = Date.now();
    console.log(newnote);

    //retrieve notes, convert into array using JSONparse

    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        error ? console.error(error) : console.log(data)
        var parseData = JSON.parse(data)
        console.log(parseData);
        parseData.push(newnote)
        console.log(parseData);
        var stringData = JSON.stringify(parseData);

        //writes data to file

        fs.writeFile("./db/db.json", stringData, (err) => {
            if (err)
                console.log(err);
            else {
                console.log("File written successfully\n");
                console.log("The written has the following contents:");
                console.log(fs.readFileSync("./db/db.json", "utf8"));
                res.json(parseData);
            }
        });


    }
    );

})


app.get('/api/notes', (req, res) => {  //reads data from db.json file and returns the data to /api/notes

    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        error ? console.error(error) : console.log(data)
        var parseData = JSON.parse(data)
        res.json(parseData)
    }
    );

});

//reverts back to homepage if query string does not exist
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html'))); //redirects user if page does not exist 

//listening to server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
