const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

const uploadFile = (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.      
      res.status(500).json({ error: 'File upload failed' });
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(500).json({ error: 'Unknown error occurred' });
    } else {
      // File upload succeeded.
      console.log(req.file, "photo upload");
      res.status(200).json({ filename: req.file.filename });
    }
  });
};
////////////////edit image 
const updateImage = (req, res) => {
    const { filename } = req.params; // Assuming the filename is passed as a parameter
    const newImage = req.file; // Assuming you're using multer middleware for file upload
  
    // Construct the paths to the existing and new image files
    const imagePath = path.join(__dirname, 'images', filename);
    const newImagePath = path.join(__dirname, 'images', newImage.filename);
  
    // Check if the file to be updated exists
    if (fs.existsSync(imagePath)) {
      // Remove the existing image file
      fs.unlinkSync(imagePath);
  
      // Rename the new image file to the original filename
      fs.renameSync(newImage.path, imagePath);
  
      // Respond with success message
      res.status(200).json({ message: 'Image updated successfully' });
    } else {
      // If the file to be updated does not exist, return an error response
      res.status(404).json({ error: 'Image not found' });
    }
  };
  

///// delete image


const deleteImage = (req, res) => {
  const { filename } = req.params; // Assuming the filename is passed as a parameter

  // Construct the path to the image file
  const imagePath = path.join(__dirname, 'images', filename);

  // Check if the file exists
  if (fs.existsSync(imagePath)) {
    // Delete the file
    fs.unlinkSync(imagePath);
    res.status(200).json({ message: 'Image deleted successfully' });
  } else {
    // If the file does not exist, return an error response
    res.status(404).json({ error: 'Image not found' });
  }
};

module.exports = { deleteImage };

module.exports = {
     uploadFile,
     updateImage,
     deleteImage
     };