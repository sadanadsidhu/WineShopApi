const Customer = require("../models/customberRegisterModel");

/////////////////register customer-------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const createUser = async (req, res) => {

//   try {
//     // Your existing createUser code
//     const { mobileNumber, username, email } = req.body;

//     const existingCustomer = await Customer.findOne({

//       $or: [{ username, email }],
//     });

//     if (existingCustomer) {
//       return res
//         .status(400)
//         .json({ error: "Username and email already exist" });
//     }

//     const newCustomer = await Customer.create({
//       mobileNumber,
//       username,
//       email,
//     });
//     const user = await Customer.findOne({
//       $or: [{ username }, { email }]
//     });
//     if (!user) {
//       return res.status(404).json({ error: "User doesn't exist" });
//     }

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const createUser = async (req, res) => {
  try {
    const { mobileNumber, username, email } = req.body;

    // Check if user with the provided username or email already exists
    const existingCustomer = await Customer.findOne({
      $or: [{ username }, { email }],
    });

    if (existingCustomer) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Create a new customer
    const newCustomer = await Customer.create({
      mobileNumber,
      username,
      email,
    });

    // Optionally, you can return the newly created user
    return res.status(201).json(newCustomer);
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

const getUsersByMobileNumber = async (req, res) => {
  try {
    const { mobileNumber } = req.params;
    const users = await Customer.find({ mobileNumber });

    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUsersByMobileNumber,
};
