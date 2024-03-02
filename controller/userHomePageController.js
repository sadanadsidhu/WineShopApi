const Wine = require('../models/userHomePageModel'); // Assuming your Mongoose model is in a models directory

exports.getAllWines = async (req, res) => {
  try {
    const wines = await Wine.find();
    res.json(wines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createWine = async (req, res) => {
  try {
    const newWine = new Wine(req.body);

    // Optional validation (recommended)
    // const validationErrors = newWine.validateSync();
    // if (validationErrors) {
    //   return res.status(400).json({ errors: validationErrors.errors });
    // }

    await newWine.save();
    res.status(201).json(newWine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getWineById = async (req, res) => {
  try {
    const wine = await Wine.findById(req.params.id);
    if (!wine) {
      res.status(404).json({ message: 'Wine not found' });
      return;
    }
    res.json(wine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateWine = async (req, res) => {
  try {
    const updatedWine = await Wine.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedWine) {
      res.status(404).json({ message: 'Wine not found' });
      return;
    }
    res.json(updatedWine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteWine = async (req, res) => {
  try {
    const wine = await Wine.findByIdAndDelete(req.params.id);
    if (!wine) {
      res.status(404).json({ message: 'Wine not found' });
      return;
    }
    res.json({ message: 'Wine deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






