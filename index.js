// Library Imports
var express = require('express');
var app = express();
var cors = require("cors");
const axios = require('axios');


// File Imports
const DBconn = require("./connectDB");

// Main Vars
var port = 5000;


// Allow ability to get data from client in json form
app.use(cors());
app.use(express.json());

// Paths

// Startup path
app.put("/startup/:userid/",async(req,res) => {
  try{
    const userid = req.params.userid;
    
    var query = "SELECT * FROM wardrobe;";
    var wardrobe = await DBconn.query(query).catch(err => {
      console.log(err);
    });
    // Sends wardrobe to app
    res.json(wardrobe);
    // Sends ping to python
    axios.put(`http://localhost:5001/start?userid=${userid}`).then((res) =>{
      // Output if not successful
      console.log(res.data);
      if(res.data != 200){
        console.log("Error: Python Rejected Add");
      }
    });
  }
  catch(err){
    console.log(err)
  }
});




/*
Path: /add

Desc:
App contacts /add endpoint after entering an item's attr. The endpoint adds the given data to the SQL wardrobe DB. It then pings the python server with
the items data so it can be added to the pythons wardrobe object.

Input
 - JSON dictinary with the items information
Output
 - The added item is sent to python as a json dictionary
 - User ID : NOT IMPLEMENTED
 */

app.post("/add",async(req,res) => {
  try {
    // Get the data from the request
    var data = req.body;
    // Create insert query
    var query = "INSERT INTO wardrobe VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)";
    // Setup query data
    var query_data = [data.PIECEID, data.COLOR, data.TYPE, null, data.TIMES_WORN, data.RATING, 
                      data.OC_FORMAL, data.OC_SEMI_FORMAL, data.OC_CASUAL, data.OC_WORKOUT, data.OC_OUTDOORS, 
                      data.OC_COMFY, data.WE_COLD, data.WE_HOT, data.WE_RAINY, data.WE_SNOWY, data.WE_TYPICAL,
                      data.DIRTY];
    // Execute query
    const add_newItem = await DBconn.query(query,query_data).catch(err => {
      console.log(err);
    });
    
    // This might not be needed
    res.json(add_newItem);
   // Setup data to send back to python, same dict that was sent to SQL DB
   const py_ping = {
      "data": query_data,
   };

  // Execute put to python server with json dict
  // to specify a specific userid http://localhost:5001/ping?userid=XXXX
  axios.put("http://localhost:5001/add?userid=999", py_ping).then((res) =>{
    // Output if not successful
    if(res.data != 200){
      console.log("Error: Python Rejected Add");
    }
    
  });

  }
  // move this u idiot - matt talking to matt
  catch(err) {
    console.error(err.message);
  }
});

/*
Path: /wardrobe

Desc:
App contacts endpoint to get the entire wardrobe from database. Node sends the wardrobe back to the app

Input
 - USER ID : NOT IMPLEMENTED
Output
 - JSON dictionary of the wardrobe
 */
app.get("/wardrobe",async(req,res) => {
  try {
    // query
    var query = "SELECT * FROM Wardrobe";
    // Execute query
    const wardrobe = await DBconn.query(query);
    // Send json of all rows
    res.json(wardrobe.rows);
  }
  // Log errors
  catch(err) {
    console.error(err.message);
  }
});

/*
Path: /delete/:id

Desc:
App contacts endpoint to delete an item from the wardrobe. Endpoint removes the item from the SQL db based on pieceID 
then it contacts python server to remove it from the wardrobe object

Input
 - Piece ID
 - To python server: user id - NOT IMPLEMENTED
Output
 - NONE
 */
app.delete("/delete/:userid",async(req,res) => {
  // Get ID
  const id = req.params.userid;
  
  try {
    // Delete query
    const del = `DELETE FROM Wardrobe WHERE PIECEID = $1 RETURNING *`;
    const query_data = [id]
    //Execute SQL delete
    const deletedItem = await DBconn.query(query,query_data);
    res.json(deletedItem);
    
    const py_ping = {
      "PK": id
   };
   // Ping python with Piece ID
    axios.put("http://localhost:5001/delete?userid=999", py_ping).then((res) => {
      // Log error if delete is rejected
      if(res.data != 200){
        console.log("Error: Python Rejected Add");
      }
    })
  }
  catch(err) {
    console.error(err.message);
  }
});

// Recommender Train path
app.put("/recommender_train/:userid/",async(req,res) => {
  try{
    const userid = req.params.userid;
    res.sendStatus(200);
    axios.get(`http://localhost:5001/recommender_train?userid=${userid}`).then((res) =>{
      // Output if not successful
      //console.log(res.data);
      if(res.data != 200){
        console.log("Error: Python Recommender Train");
      }
    });
  }
  catch(err){
    console.log(err)
  }
});

// Recommender Train path
app.put("/recommend/:userid/:occasion/:weather",async(req,res) => {
  try{
    const userid = req.params.userid;
    const occasion = req.params.occasion;
    const weather = req.params.weather;    
    res.sendStatus(200);
    const py_ping = {
      "occasion": occasion,
      "weather": weather
   };

    axios.put(`http://localhost:5001/recommend?userid=${userid}`,py_ping).then((res) =>{
      // Output if not successful
      if(res.data != 200){
        console.log("Error: Python Recommender Train");
      }
    });
  }
  catch(err){
    console.log(err)
  }
});


// Testing functions

/*
Function: dropCreateTable

Desc:
Resets wardrobe table while for testing purposes

Input
 - NONE
Output
 - NONE
 */
const dropcreateTable = async()=> {
  // Create table query 
  var query = "CREATE TABLE wardrobe ( \
        pieceID INT PRIMARY KEY, \
        COLOR VARCHAR(12), \
        TYPE VARCHAR(5), \
        RECENT_DATE_WORN DATE, \
        TIMES_WORN INT, \
        RATING NUMERIC(3,2) DEFAULT 0.50, \
        OC_FORMAL BOOLEAN, \
        OC_SEMI_FORMAL BOOLEAN, \
        OC_CASUAL BOOLEAN, \
        OC_WORKOUT BOOLEAN, \
        OC_OUTDOORS BOOLEAN, \
        OC_COMFY BOOLEAN, \
        WE_COLD BOOLEAN, \
        WE_HOT BOOLEAN, \
        WE_RAINY BOOLEAN, \
        WE_SNOWY BOOLEAN, \
        WE_AVG_TMP BOOLEAN, \
        DIRTY BOOLEAN)";
  // DROP wardrobe table if it currently exists
  await DBconn.query("DROP TABLE IF EXISTS wardrobe");
  // Execute create table
  await DBconn.query(query);
  return true;
}

const shutdownPython = async() => {
  await axios.delete("http://localhost:5001/end");
  return true;
}

// Starts the server on the port given
var server = app.listen(port,() => {
  console.log("Server has started on port: " + port);
  

  console.log("Resetting the database...");
  // Reset the table
  dropcreateTable().then((result)=>{
    if(result){
      console.log("Database has been reset");
    }
    else{
      console.log(result);
    }
  });
});

/*
Function: shutdown function, executes on CTRL + C

Desc:
Triggers shutdown process. Other shutdown procedures will go here.
Input
 - NONE
Output
 - NONE
 */
process.on('SIGINT', function() {
  console.log( "\nShutting Main Server Down and Closing Database Connections...");
  console.log('Http server closed.');
  DBconn.end();
  console.log("App Successfully Shut Down");
  server.close();
});