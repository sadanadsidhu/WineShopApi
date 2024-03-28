const express = require("express");
const router = express.Router();
const uploadController = require("../middleware/uploadPanImages");

// Route for uploading a file
router.put("/edit/pan/:filename", uploadController.updateImage);
router.post("/upload/pan", uploadController.uploadFile);
router.delete("/delete/pan/:filename", uploadController.deleteImage);

module.exports = router;
