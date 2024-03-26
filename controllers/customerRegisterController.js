const { response } = require('express');
const Customer = require('../models/customberRegisterModel');
const cookie = require('cookie-parser');

const jwt = require('jsonwebtoken'); 
require('dotenv').config();

const generateAccessAndRefreshToken = async (userid) => {
  try {
    const user = await Customer.findById(userid);
    if (!user) {
      throw new Error("User not found");
    }

    // Generate access token
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

    // Generate refresh token
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

    // Update user's refresh token in the database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

/////////////////register customer-------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const createUser = async (req, res) => {
  try {
    // Your existing createUser code
    const { mobileNumber, username, email } = req.body;

    const existingCustomer = await Customer.findOne({
      $or: [{ username, email }],
    });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ error: "Username and email already exist" });
    }

    const newCustomer = await Customer.create({
      mobileNumber,
      username,
      email,
    });

    // Return success response if needed
    return res
      .status(200)
      .json({ message: "User created successfully", user: newCustomer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const loginUser = async (req, res) => {
  const { username, email  } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: "Username and email are required" });
  }

  const user = await Customer.findOne({
    $or: [{ username }, { email }]
  });
  if (!user) {
    return res.status(404).json({ error: "User doesn't exist" });
  }

  const { accessToken, refreshToken, error } = await generateAccessAndRefreshToken(user._id);
  if (error) {
    return res.status(500).json({ error });
  }

  const loggedinUser = await Customer.findById(user._id).select("-refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };
  
  return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      user: loggedinUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
      message: "User logged in successfully"
    });
};

module.exports = { 
  createUser,
  loginUser,
};
