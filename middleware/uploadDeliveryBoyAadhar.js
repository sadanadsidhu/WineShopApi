const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./imagesaadhardelivery");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
}).single("file");

const uploadDeliveryBoyAadhar = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).json({ error: "File upload failed" });
    } else if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const uploadedImage = req.file;
      console.log(uploadedImage, "photo uploaded");

      res.status(200).json({ filename: uploadedImage.filename });
    }
  });
};

const getDeliveryBoyAadhar = async (req, res) => {
    try {
        const { imageName } = req.params;
        // Send the requested image file
        res.sendFile(path.join(__dirname, '..', 'imagesaadhardelivery', imageName));
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

const getDeliveryAadharPhoto = async (req, res) => {
  try {
      const filename = req.params.filename;
      const folderPath = './imagesaadhardelivery';
      
      const imagePath = path.join(folderPath, filename);
      
      // Check if the file exists
      try {
          await fs.access(imagePath, fs.constants.R_OK);
      } catch (error) {
          res.status(404).json({ success: false, error: "Image not found" });
          return;
      }
      
      const rootPath = path.resolve('.');
      const absoluteImagePath = path.join(rootPath, imagePath);
      res.sendFile(absoluteImagePath);
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
    uploadDeliveryBoyAadhar,
    getDeliveryBoyAadhar,
    getDeliveryAadharPhoto
};