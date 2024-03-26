const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './imagesaadhar');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

const uploadFile = (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).json({ error: 'File upload failed' });
    } else if (err) {
      res.status(500).json({ error: 'Unknown error occurred' });
    } else {
      console.log(req.file, "photo upload");
      res.status(200).json({ filename: req.file.filename });
    }
  });
};
////////////////edit image 
const updateImage = (req, res) => {
    const { filename } = req.params; 
    const newImage = req.file; 
      const imagePath = path.join(__dirname, 'images', filename);
    const newImagePath = path.join(__dirname, 'images', newImage.filename);
  
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);  
      fs.renameSync(newImage.path, imagePath);
      res.status(200).json({ message: 'Image updated successfully' });
    } else {
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