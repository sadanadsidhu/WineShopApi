const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database is not working"));

app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.use('/', require("./routes/uploadImageRoutes"));
app.use('/', require("./routes/winesCategoriesRoutes"));
app.use('/', require("./routes/wineShopRoutes"));
app.use('/', require("./routes/userOtpVarificationRoutes"));
app.use('/', require("./routes/customerRegisterRoutes"));
app.use('/', require("./routes/uploadAadharroutes"));
app.use('/', require("./routes/uploadPanRoutes"));

app.listen(process.env.PORT, () =>
console.log(`Server is running on port ${process.env.PORT}`));
       

