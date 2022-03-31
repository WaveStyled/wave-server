// Imports the express library
var express = require('express');
var app = express();
var cors = require("cors");
var port = 5000

// Allow ability to get data from client in json form
app.use(cors());
app.use(express.json());

// Starts the server on the port given
app.listen(port,() => {
  console.log("Sever has started on port: " + port)
})
