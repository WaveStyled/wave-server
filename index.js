// Library Imports
var express = require('express');
var app = express();
var cors = require("cors");
const axios = require('axios');
// const {spawn} = require('child_process')


// File Imports
const DBconn = require("./connectDB");

// Main Vars
var port = 5000;


// Allow ability to get data from client in json form
app.use(cors());
app.use(express.json());

// Paths

// add an item

app.post("/add",async(req,res) => {
  try {
    var data = req.body;
   
    var query = "INSERT INTO wardrobe (PIECEID, R_COLOR,G_COLOR,B_COLOR,TYPE,OC_FORMAL,OC_SEMI_FORMAL,OC_CASUAL,OC_WORKOUT,OC_OUTDOORS,OC_COMFY, WE_COLD,WE_HOT,WE_RAINY,WE_SNOWY,WE_AVG_TMP) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)";
    var query_data = [data.PIECEID, data.R_COLOR, data.G_COLOR, data.B_COLOR, data.TYPE, data.OC_FORMAL,data.OC_SEMI_FORMAL, data.OC_CASUAL, data.OC_WORKOUT, data.OC_OUTDOORS, data.OC_COMFY, data.WE_COLD, data.WE_HOT, data.WE_RAINY, data.WE_SNOWY, data.WE_AVG_TMP];
    const add_newItem = await DBconn.query(query,query_data);
    res.json(add_newItem);
  
   const py_ping = {
      "data": query_data,
   };

   // to specify a specific userid http://localhost:5001/ping?userid=XXXX
    axios.put("http://localhost:5001/add?userid=999", py_ping).then((res) =>{
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });

  }
  // move this u idiot - matt talking to matt
  catch(err) {
    console.error(err.message);
  }
});

// get wardrobe
app.get("/wardrobe",async(req,res) => {
  try {
    var query = "SELECT * FROM Wardrobe";
    const wardrobe = await DBconn.query(query);
    res.json(wardrobe.rows);
  }
  catch(err) {
    console.error(err.message);
  }
});


// get a recommendation

// update an item

//DELETE item from wardrobe
app.delete("/delete/:id",async(req,res) => {
  const id = req.params.id;
  try {
    const del = `DELETE FROM Wardrobe WHERE PIECEID = $1 RETURNING *`;
    const query = {
      text: del,
      values: [id],
    };
    const deletedItem = await DBconn.query(query);
    res.json(deletedItem);

    const py_ping = {
      "PK": data.PIECEID
   };
    axios.put("http://localhost:5001/delete?userid=999", py_ping).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  catch(err) {
    console.error(err.message);
  }
});


// Resets the wardrobe table
const dropcreateTable = async()=> {
  var query = "CREATE TABLE wardrobe ( \
        pieceID INT PRIMARY KEY, \
        R_COLOR INT, \
        G_COLOR INT, \
        B_COLOR INT, \
        TYPE VARCHAR(4), \
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
        WE_AVG_TMP BOOLEAN)";
  await DBconn.query("DROP TABLE IF EXISTS wardrobe");
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
  
  // for testing purposes
  console.log("Resetting the database...");
  dropcreateTable().then((result)=>{
    if(result){
      console.log("Database has been reset");
    }
    else{
      console.log(result);
    }
  });
  // console.log("Initializing the Python Files: \n");
  /// python = spawn('python3', ['../wave-recommender/Link.py']);
  // console.log("Link.py Running...\n");

});

// Facilitates app shut down (CRTL + C)
process.on('SIGINT', function() {
  console.log( "\nShutting Main Server Down and Closing Database Connections...");
  console.log('Http server closed.');
  DBconn.end();
  console.log("App Successfully Shut Down");
  
  shutdownPython().then((result)=>{
    if(result){
      console.log("Python Server Succesfully Shutdown");
    }
  });
  
  server.close();
  //process.exit(0);
  // some other closing procedures go here
});