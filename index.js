// Library Imports
var express = require('express');
var app = express();
var cors = require("cors");
var request = require("request")
const axios = require('axios');


// File Imports
const DBconn = require("./connectDB");

// Main Vars
var port = 5000;
var python_server_dest = "http://localhost:5001/ping";


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
      "PK": data.PIECEID
   };


    axios.put("http://localhost:5001/ping", py_ping).then((res) =>{
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });



  }
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
    axios.put("http://localhost:5001/ping", py_ping).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  catch(err) {
    console.error(err.message);
  }
});


// Starts the server on the port given
app.listen(port,() => {
  console.log("Server has started on port: " + port);
})
