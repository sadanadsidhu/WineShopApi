const Customer = require('../models/customberRegisterModel');


const createUser = async (req, res) => {
  
  try {
    const { mobileNumber, username, email,permanentAddress } = req.body;

    // Check if user with the provided username or email already exists
    // const existingCustomer = await Customer.findOne({
    //   $or: [{ username }, { email }],
    // });

    // if (existingCustomer) {
    //   return res
    //     .status(400)
    //     .json({ error: "Username or email already exists" });
    // }

    // Create a new customer
    const newCustomer = await Customer.create({
      mobileNumber,
      username,
      email,
      permanentAddress
    });
    const user = await Customer.findOne({
      $or: [{ username }, { email }]
    });
    if (!user) {
      return res.status(404).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////////---------login
const loginUser = async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: "Username and email are required" });
  }
};

/////////////////////get User      

// const getUsersByMobileNumber = async (req, res) => {
//   try {
//     const { mobileNumber } = req.params;
//     const users = await Customer.find({ mobileNumber });
    
//     return res.status(200).json({ users });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };/

const getUsersByMobileNumber = async (req, res) => {
  try {
    const { mobileNumber } = req.params;
    const page = req.query.page ? parseInt(req.query.page) : 1; // Get the page number from query parameters, default to 1 if not provided
    const limit = 10; // Limiting to 10 users per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const users = await Customer.find({ mobileNumber }).skip(skip).limit(limit); // Skip the appropriate number of documents and limit the result to 10
    
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};




/////////////////////delete All user data from database be carefull when you will delete data-----------
const deleteAllUsers = async (req, res) => {
  try {
    // Delete all user documents
    const result = await Customer.deleteMany({});
    
    // Check if any documents were deleted
    if (result.deletedCount > 0) {
      return res.status(200).json({ message: "All user data deleted successfully" });
    } else {
      return res.status(404).json({ message: "No user data found to delete" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUsersByMobileNumber,
  deleteAllUsers
};
