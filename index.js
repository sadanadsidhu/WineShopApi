const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Razorpay=require("razorpay");
const cloudinary=require("cloudinary")

const app = express();

///////////////////////razorpay //////////////////////
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});
module.exports = instance;

///////////////////////cloudinary //////////////////////
          
cloudinary.v2.config({ 
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME, 
  api_key: process.env.CLOUDINARY_CLIENT_API, 
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET 
});
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database is not working"));

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/', require("./routes/uploadImageRoutes"));
app.use('/', require("./routes/winesCategoriesRoutes"));
app.use('/', require("./routes/wineShopRoutes"));
app.use('/', require("./routes/userOtpVarificationRoutes"));
app.use('/', require("./routes/customerRegisterRoutes"));
app.use('/', require("./routes/uploadAadharroutes"));
app.use('/', require("./routes/uploadPanRoutes"));
app.use('/', require("./routes/aadharFetchDataRoutes"));
app.use('/', require("./routes/panCardFetchDataRoutes"));
app.use('/', require("./routes/uploadSelfieImages"));
app.use('/', require("./routes/selfieImagesWithStatusRoutes"));
app.use('/', require("./routes/wineSubCategoriesImagesRoutes"));
app.use('/', require("./routes/wineSubCategoriesRoutes"));
app.use('/', require("./routes/addToCartSubCategoriesRoutes"));
app.use('/', require("./routes/allAddToCardSubCategoriesRoutes"));
app.use('/', require("./routes/customerCurrentAddressAndPermanentAddressRoutes"));
app.use('/', require("./routes/uploadWineshopimagesRoutes"));
app.use('/', require("./routes/paymentGetWayRoutes"));
app.use('/', require("./routes/uploadSwiperImagesRoutes"));


app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
