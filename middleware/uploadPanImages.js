const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Require the fs module for file operations

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Replace 'path/to/your/images/folder' with the actual path to your images folder
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename by appending a timestamp and the original filename
    const uniqueFilename = Date.now() + '-' + file.originalname;
    cb(null, uniqueFilename);
  },
});
const upload = multer({ storage });
const uploadFile = (req, res) => {
  // Use the 'upload' middleware to handle the file upload
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

const deleteImage = (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, 'images', filename);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
    res.status(200).json({ message: 'Image deleted successfully' });
  } else {
    res.status(404).json({ error: 'Image not found' });
  }
};

module.exports = {
  uploadFile,
  updateImage,
  deleteImage
};
