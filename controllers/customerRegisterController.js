const Customer = require('../models/customberRegisterModel');

// Function to create a new user     
const createUser = async (req) => {
  try {
    const { username, email, localAddress, permanentAddress } = req.body;
    const newUser = new Customer({ username, email, localAddress, permanentAddress });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to get a user by ID
const getUserById = async (userId) => {
  try {
    const user = await Customer.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;   
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createUser, getUserById };
