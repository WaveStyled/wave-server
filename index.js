// Imports the express library
var express = require('express');
var app = express();
var cors = require("cors");
var port = 5000;
const DBconn = require("./connectDB");


// Allow ability to get data from client in json form
app.use(cors());
app.use(express.json());


// Paths

// add an item

app.post("/add",async(req,res) => {
  try {
    var data = req.body;
    var query = "INSERT INTO Wardrobe (R_COLOR,G_COLOR,B_COLOR,TYPE,OC_FORMAL,OC_SEMI_FORMAL,OC_CASUAL,OC_WORKOUT,OC_OUTDOORS,OC_COMFY, WE_COLD,WE_HOT,WE_RAINY,WE_SNOWY,WE_AVG_TMP) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var query_data = [data.R_COLOR, data.G_COLOR, data.B_COLOR, data.TYPE, data.OC_FORMAL,data.OC_SEMI_FORMAL, data.OC_CASUAL, data.OC_WORKOUT, data.OC_OUTDOORS, data.OC_COMFY, data.WE_COLD, data.WE_HOT, data.WE_RAINY, data.WE_SNOWY, data.WE_AVG_TMP];
    const add_newItem = await conn.query(query,query_data);
    res.json(add_newItem);

  }
  catch(err) {
    console.error(err.message);
  }
});

// get wardrobe

app.get("/wardrobe",async(req,res) => {
  try {
    var query = "SELECT * FROM Wardrobe";
    const wardrobe = await conn.query(query);
    res.json(wardrobe.rows);
  }
  catch {

  }
});


// get a recommendation

// update an item




// Starts the server on the port given
app.listen(port,() => {
  console.log("Sever has started on port: " + port)
})
