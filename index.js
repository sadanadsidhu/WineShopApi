const dotenv = require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const wineRoutes = require('./routes/userHomePageRoutes');


const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database is not working"));

app.use(express.json());

app.use('/', wineRoutes);

app.listen( () => console.log(`Server is running on port ${process.env.port}`));


// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();
// const wineRoutes = require('./routes/userHomePageRoutes');
// const app = express();

// mongoose
//   .connect("mongodb://localhost:127.0.0.1/WineProject")
//   .then(() => console.log("Database Connected"))
//   .catch((err) => console.log("Database is not working"));

// app.use(express.json());

// app.use('/api', wineRoutes);


// app.listen( () => console.log(`Server is running on port ${process.env.PORT}`));

