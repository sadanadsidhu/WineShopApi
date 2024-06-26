const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./imageselfie");
  },
  filename: function (req, file, cb) {
    const uniqueFilename =  file.originalname;
    cb(null, uniqueFilename);
  },
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

const uploadFile = (req, res) => {
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

module.exports = {
  uploadFile,
};



  