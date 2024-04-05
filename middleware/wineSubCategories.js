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

// const getImagesFromFolder = async (folderPath) => {
//     try {
//       console.log('Folder path:', folderPath);
//       const files = await fs.promises.readdir(folderPath);
//       console.log('Files:', files);
//       return files;
//     } catch (error) {
//       console.error('Error reading folder:', error);
//       throw new Error('Failed to read images from folder');
//     }
// };

module.exports = {
    uploadFile,
    // getImagesFromFolder
    };