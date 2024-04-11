const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getUsersByMobileNumber,
  deleteAllUsers
} = require("../controllers/customerRegisterController");

router.post("/customer-register", createUser);
router.post("/customer-login", loginUser);
router.get("/get-register-user/:mobileNumber", getUsersByMobileNumber);
router.delete('/delete-all-users', deleteAllUsers);
module.exports = router;
