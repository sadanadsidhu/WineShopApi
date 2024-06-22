const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv").config();
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    ///////////////////file has been successfully uploaded//////////////////////
    console.log("file uploaded successfully on cloudinary", response.url);
    return response;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); //remove the temporary file from the cloudinary
    }
    return null;
  }
};

module.exports = {
  uploadOnCloudinary,
};
