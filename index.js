// Library Imports
var express = require("express");
var app = express();
var cors = require("cors");
const axios = require("axios");

// File Imports
const DBconn = require("./utils/connectDB.js");
const sequelized = require("./utils/database.js");
const { signup, login, authenticate } = require("./userauth/auth.js");

// Main Vars
var port = 5000;

// Allow ability to get data from client in json form
app.use(cors());
app.use(express.json());

sequelized
  .sync({ force: true }) // this resets the user table every time
  .then(() => {
    console.log(`Database & tables created!`);
  });

app.post("/users/signup", signup);
app.post("/users/login", login);
app.get("/users/private/auth", authenticate);

// Startup path
app.put("/startup/:userid/", async (req, res) => {
  try {
    const userid = req.params.userid;

    var query = "SELECT * FROM wardrobe ORDER BY pieceid DESC;";
    var wardrobe = await DBconn.query(query).catch((err) => {
      console.log(err);
    });
    // Sends wardrobe to app
    res.json(wardrobe);
    // Sends ping to python
    axios.put(`http://localhost:5001/start/?userid=${userid}`).then((res) => {
      // Output if not successful
      if (res.data != 200) {
        console.log("Error: Python Rejected Add");
      }
    });
  } catch (err) {
    console.log(err);
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

app.post("/add/:userid/", async (req, res) => {
  try {
    // Get the data from the request
    const userid = req.params.userid;
    var data = req.body;
    // Create insert query
    var query =
      "INSERT INTO wardrobe VALUES ($1,$2,$3,DEFAULT,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)";
    // Setup query data
    var query_data = [
      data.PIECEID,
      data.COLOR,
      data.TYPE,
      data.TIMES_WORN,
      data.RATING,
      data.OC_FORMAL,
      data.OC_SEMI_FORMAL,
      data.OC_CASUAL,
      data.OC_WORKOUT,
      data.OC_OUTDOORS,
      data.OC_COMFY,
      data.WE_COLD,
      data.WE_HOT,
      data.WE_RAINY,
      data.WE_SNOWY,
      data.WE_TYPICAL,
      data.DIRTY,
    ];

    // Execute query
    const add_newItem = await DBconn.query(query, query_data).catch((err) => {
      console.log(err);
    });

    var add_image = "INSERT INTO Images VALUES ($1, $2)";
    var image_data = [data.PIECEID, data.IMAGE];

    try {
      await DBconn.query(add_image, image_data).catch((err) => {
        console.log("CANNOT ADD IMAGE", err);
      });
    } catch (error) {}

    // This might not be needed
    res.json(add_newItem);
    // Setup data to send back to python, same dict that was sent to SQL DB
    query_data.splice(3, 0, null);

    const py_ping = {
      data: query_data,
    };
    // Execute put to python server with json dict
    // to specify a specific userid http://localhost:5001/ping?userid=XXXX
    axios
      .put(`http://localhost:5001/add?userid=${userid}`, py_ping)
      .then((res) => {
        // Output if not successful
        if (res.data != 200) {
          console.log("Error: Python Rejected Add");
        }
      });
  } catch (err) {
    // move this u idiot - matt talking to matt
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
app.get("/wardrobe", async (req, res) => {
  try {
    // query
    var query = "SELECT * FROM Wardrobe ORDER BY pieceid DESC";
    var imgs = "SELECT * FROM images ORDER BY pieceid DESC";
    // Execute query
    const wardrobe = await DBconn.query(query);
    const images = await DBconn.query(imgs);
    // Send json of all rows

    wardrobe.rows.map((element, index) => {
      element.image = images.rows[index].image_encode;
      return element;
    });

    await res.json(wardrobe.rows);
  } catch (err) {
    // Log errors
    console.error(err.message);
  }
});

/**
 * Update a Wardrobe Item
 * Path: /change/<userid>
 * 
 * Desc:
 * For a specified user and item, the app updates the corresponding entry in 
 * the Outfits DB and the Python Models
 * 
 * Input:
 *  - USERID
 *  - In the request body, the item representation
 * 
 * Returns:
 *  - None 
 */
app.put("/change/:userid", async (req, res) => {
  try {
    const userid = req.params.userid;
    var data = req.body;

    console.log(data);
    // Create insert query

    var query =
      "UPDATE wardrobe SET (color, type, oc_formal, oc_semi_formal, oc_casual, oc_workout, oc_outdoors, oc_comfy, we_cold, we_hot, we_rainy, we_snowy, we_avg_tmp, dirty, date_added) \
      = ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14, DEFAULT) WHERE pieceid = $15";
    // Setup query data
    var query_data = [
      data.COLOR,
      data.TYPE,
      data.OC_FORMAL,
      data.OC_SEMI_FORMAL,
      data.OC_CASUAL,
      data.OC_WORKOUT,
      data.OC_OUTDOORS,
      data.OC_COMFY,
      data.WE_COLD,
      data.WE_HOT,
      data.WE_RAINY,
      data.WE_SNOWY,
      data.WE_TYPICAL,
      data.DIRTY,
      data.PIECEID,
    ];

    // Execute query
    const add_newItem = await DBconn.query(query, query_data).catch((err) => {
      console.log(err);
    });

    var add_image = "UPDATE Images SET image_encode = $1 WHERE pieceid = $2";
    var image_data = [data.IMAGE, data.PIECEID];

    try {
      await DBconn.query(add_image, image_data).catch((err) => {
        console.log("CANNOT ADD IMAGE", err);
      });
    } catch (error) {}

    query_data.unshift(query_data.pop());
    query_data.splice(3, 0, null);
    query_data.splice(3, 0, null);
    query_data.splice(3, 0, null);


    const py_ping = {
        data : query_data
    }
    // // Execute put to python server with json dict
    // // to specify a specific userid http://localhost:5001/ping?userid=XXXX
    axios
      .post(`http://localhost:5001/change/?userid=${userid}`, py_ping)
      .then((res) => {
        // Output if not successful
        if (res.data != 200) {
          console.log("Error: Python Rejected Add");
        }
      });
  } catch (err) {
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
app.post("/delete/:userid/:pieceid", async (req, res) => {
  // Get ID
  const id = req.params.pieceid;
  console.log(id);
  try {
    // Delete query
    const del = `DELETE FROM Wardrobe WHERE PIECEID = $1`;
    const query_data = [id];
    //Execute SQL delete
    const deletedItem = await DBconn.query(del, query_data);

    const delimg = "DELETE FROM Images WHERE PIECEID = $1";
    await DBconn.query(delimg, query_data);

    const newDB = await DBconn.query(
      "SELECT * FROM Wardrobe ORDER BY pieceid DESC"
    );

    var imgs = "SELECT * FROM images ORDER BY pieceid DESC";
    const images = await DBconn.query(imgs);
    // Send json of all rows

    newDB.rows.map((element, index) => {
      element.image = images.rows[index].image_encode;
      return element;
    });

    await res.json(newDB.rows);

    const py_ping = {
      PK: id,
    };
    // Ping python with Piece ID
    axios
      .delete(
        `http://localhost:5001/delete/?userid=${req.params.userid}&id=${id}`
      )
      .then((res) => {
        // Log error if delete is rejected
        if (res.data != 200) {
          console.log("Error: Python Rejected Add");
        }
      });
  } catch (err) {
    console.error(err.message);
  }
});

// Recommender Train path
app.put("/recommender_train/:userid/", async (req, res) => {
  try {
    const userid = req.params.userid;
    console.log(userid);
    res.sendStatus(200);
    await axios
      .post(`http://localhost:5001/recommend_train/?userid=${userid}`)
      .then((res) => {
        // Output if not successful
        //console.log(res.data);
        if (res.data != 200) {
          console.log("Error: Python Recommender Train");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
});

// Recommender Train path
app.put("/recommend/:userid/:occasion/:weather/", async (req, res) => {
  try {
    const userid = req.params.userid;
    const occasion = req.params.occasion;
    const weather = req.params.weather;
    const py_ping = {
      occasion: occasion,
      weather: weather,
    };

    await axios
      .get(
        `http://localhost:5001/recommend/?userid=${userid}&occasion=${occasion}&weather=${weather}`,
        py_ping
      )
      .then((result) => {
        // Output if not successful
        res.send(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
});

// Calibrate Start
app.put("/start_calibrate/:userid/:num_calibrate", async (req, res) => {
  try {
    const userid = req.params.userid;
    const num_calibrate = { num_calibrate: req.params.num_calibrate };
    axios
      .put(
        `http://localhost:5001/calibrate_start/?userid=${userid}&num_calibrate=${req.params.num_calibrate}`
      )
      .then((result) => {
        res.json(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
});

// Calibrate End
app.put("/end_calibrate/:userid", async (req, res) => {
  var data = { data: req.body };
  console.log(data);
  try {
    const userid = req.params.userid;
    const result = await axios.put(
      `http://localhost:5001/calibrate_end/?userid=${userid}`,
      data
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

/**
 * Path:
 * Sets the outfit of the day (OOTD) for the user
 * 
 * Inputs:
 *  - USERID
 *  - In the request body the outfit tuple, weather and occasion strings
 * 
 * Returns:
 * None
 */
app.put("/OOTD/:userid", async (req, res) => {
  try {
    const userid = req.params.userid;
    var data = {
      outfit: req.body.outfit,
      weather: req.body.weather,
      occasion: req.body.occasion,
    };
    console.log(data);
    await axios
      .put(`http://localhost:5001/OOTD/?userid=${userid}`, data)
      .then((result) => {
        res.json(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
});


/**
 * Path:
 * Get the outfit of the day (OOTD) for the user given the weather and occasion
 * 
 * (Supports Date but Currently not implemented (default "" or today))
 * 
 * Inputs:
 *  - USERID
 *  - In the request body the weather and occasion strings
 * 
 * Returns:
 * None
 */
app.get("/OOTD/:userid", async (req, res) => {
  try {
    const userid = req.params.userid;
    var data = {
      weather: req.body.weather,
      occasion: req.body.occasion,
      date: req.body.date,
    };
    console.log(data);
    await axios
      .get(`http://localhost:5001/OOTD/?userid=${userid}`, data)
      .then((result) => {
        res.json(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
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
const dropcreateTable = async () => {
  // Create table query
  var createWardrobe =
    "CREATE TABLE wardrobe ( \
        pieceID INT PRIMARY KEY, \
        COLOR VARCHAR(12), \
        TYPE VARCHAR(5), \
        DATE_ADDED TIMESTAMP DEFAULT Now(), \
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

  var createOutfits =
    "CREATE TABLE Outfits (\
    OUTFIT_ID INT PRIMARY KEY,\
    HAT INT,\
    SHIRT INT,\
    SWEATER INT,\
    JACKET INT,\
    BOTTOM_LAYER INT,\
    SHOES INT,\
    MISC INT,\
    TIMES_WORN INT DEFAULT 0,\
    RECENT_DATE_WORN DATE,\
    FIT_SCORE NUMERIC(3,2) DEFAULT 0.5,\
    OCCASION INT,\
    WEATHER INT,\
    LIKED BOOLEAN\
  )";
  var image_table =
    "CREATE TABLE images ( pieceID INT PRIMARY KEY, IMAGE_ENCODE TEXT)";
  // DROP wardrobe table if it currently exists
  await DBconn.query("DROP TABLE IF EXISTS wardrobe");
  await DBconn.query("DROP TABLE IF EXISTS Images");
  await DBconn.query("DROP TABLE IF EXISTS Outfits");
  // Execute create table
  await DBconn.query(createWardrobe);
  await DBconn.query(createOutfits);
  await DBconn.query(image_table);
  return true;
};

const shutdownPython = async () => {
  await axios.delete("http://localhost:5001/end");
  return true;
};

// Starts the server on the port given
var server = app.listen(port, () => {
  console.log("Server has started on port: " + port);

  console.log("Resetting the database...");
  // Reset the table
  dropcreateTable().then((result) => {
    if (result) {
      console.log("Database has been reset");
    } else {
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
process.on("SIGINT", function () {
  console.log(
    "\nShutting Main Server Down and Closing Database Connections..."
  );
  console.log("Http server closed.");
  DBconn.end();
  console.log("App Successfully Shut Down");
  server.close();
});
