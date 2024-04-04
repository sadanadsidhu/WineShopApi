const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './imageswinesubcategories');
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

module.exports = {
    uploadFile
    };