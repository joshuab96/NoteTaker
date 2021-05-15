//getting dependancies
const express = require("express");
const path = require("path");

//setting up express and port + uses enviromnent port otherwise uses the port specified
const app = express();
var PORT = process.env.PORT || 3001;