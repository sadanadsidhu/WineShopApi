const multer = require('multer');
// const fs = require('fs');
const path = require('path');
const fs = require('fs').promises;

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

const getImagesFromFolder = async (req, res) => {
  try {
    const { imageName } = req.params;
    // You can perform additional validation or processing here if needed

    // Send the requested image file
    res.sendFile(path.join(__dirname, '..', 'imageswinesubcategories', imageName));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

 

module.exports = {
    uploadFile,
    getImagesFromFolder,
    };