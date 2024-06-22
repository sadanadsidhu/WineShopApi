const AllCustomerAndProductDetails = require("../models/allDataCustomerAndCategoryModel");
const mongoose = require("mongoose");
const generateOrderId = () => {
  // Generate a random 6-digit number
  return Math.floor(100000 + Math.random() * 900000);
};
////////////////////////////////////////////////// CREATE ORDER /////////////////////////////////////////
const createDataCustomerAndProduct = async (req, res) => {
  try {
    const orderId = generateOrderId();

    const {
      totalPriceSum,
      deliveryCharges,
      serviceCharges,
      grandTotalPrice,
      paymentId,
      customerAddress,
      productDetails,
      shopDetails,
    } = req.body;
    const newData = new AllCustomerAndProductDetails({
      orderId,
      totalPriceSum,
      deliveryCharges,
      serviceCharges,
      grandTotalPrice,
      paymentId,
      customerAddress,
      productDetails,
      shopDetails,
    });
    const savedData = await newData.save();
    return res.status(201).json({
      code: 201,
      message: "Data created successfully.",
      data: savedData,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ code: 500, message: "Server error", error: error.message });
  }
};
//////////////////////////////////////////// GET ALL ORDERERS ////////////////////////////////////////////
// const getAllDataCustomerAndProduct = async (req, res) => {
//     try {
//         const allData = await AllCustomerAndProductDetails.find()
//             .populate('AddToCart')
//             .populate('shopDetails')
//             .populate('customerAddress');

//         return res.status(200).json(
//             { code: 200,
//             message: 'All data retrieved successfully.',
//             data: allData });
//     } catch (error) {
//         return res.status(500).json(
//             { code: 500, message: 'Server error', error: error.message });
//     }
// };
const getAllDataCustomerAndProduct = async (req, res) => {
  try {
    const allData = await AllCustomerAndProductDetails.find()
      .populate("productDetails") // Correct reference name
      .populate("shopDetails")
      .populate("customerAddress");

    return res.status(200).json({
      code: 200,
      message: "All data retrieved successfully.",
      data: allData,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Server error",
      error: error.message,
    });
  }
};

/////////////////////////////////////////// GET ORDER ACCORDING ODERID ////////////////////////////////////

const getDataByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Query the database for data with the specified order ID
    const data = await AllCustomerAndProductDetails.findOne({ orderId });

    // Check if data exists
    if (!data) {
      return res.status(404).json({ code: 404, message: "Data not found" });
    }

    // Return the data
    return res
      .status(200)
      .json({ code: 200, message: "Data retrieved successfully.", data });
  } catch (error) {
    // Handle error
    console.error(error);
    return res
      .status(500)
      .json({ code: 500, message: "Server error", error: error.message });
  }
};

////////////////////////////////////////GET DATA ACCORDING TO SHOPID ////////////////////////////////////
const getDataByShopId = async (req, res) => {
  try {
    const { shopId } = req.params;

    // Find data based on shopId
    const data = await AllCustomerAndProductDetails.find({
      shopDetails: shopId,
    })
      .populate("productDetails")
      .populate("shopDetails")
      .populate("customerAddress");

    if (!data) {
      return res.status(404).json({ code: 404, message: "Data not found" });
    }

    return res
      .status(200)
      .json({ code: 200, message: "Data retrieved successfully.", data: data });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ code: 500, message: "Server error", error: error.message });
  }
};

///////////////////////////////////////// UPDATE OSERDER ACCORDING ID /////////////////////////////////////
const updateDataCustomerAndProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedData = await AllCustomerAndProductDetails.findByIdAndUpdate(
      id,
      newData,
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ code: 404, message: "Data not found" });
    }

    return res.status(200).json({
      code: 200,
      message: "Data updated successfully.",
      data: updatedData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "Server error", error: error.message });
  }
};
//////////////////////////////////////////// DELETE ORDER ACCORDING TO ID /////////////////////////////////////////////////
const deleteDataCustomerAndProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await AllCustomerAndProductDetails.findByIdAndDelete(
      id
    );

    if (!deletedData) {
      return res.status(404).json({ code: 404, message: "Data not found" });
    }

    return res.status(200).json({
      code: 200,
      message: "Data deleted successfully.",
      data: deletedData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: "Server error", error: error.message });
  }
};

/////////////////////////////////////////////////// DELETE ALL AT ONE TIME /////////////////////////////
const deleteAllDataCustomerAndProduct = async (req, res) => {
  try {
    // Delete all documents in the collection
    await AllCustomerAndProductDetails.deleteMany({});

    // Return success response
    return res
      .status(200)
      .json({ code: 200, message: "All data deleted successfully." });
  } catch (error) {
    // Handle error
    console.error(error);
    return res
      .status(500)
      .json({ code: 500, message: "Server error", error: error.message });
  }
};
////// delete decline product //////////////////////////////////////
const deleteProductFromOrder = async (req, res) => {
  try {
    const { productId } = req.params;

    // Ensure that the provided productId is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.log("Invalid product ID:", productId);
      return res.status(400).json({ code: 400, message: "Invalid product ID" });
    }

    // Convert productId to ObjectId using `new`
    const productObjectId = new mongoose.Types.ObjectId(productId);

    console.log("Searching for product with ID:", productObjectId);

    // Find the order containing the product
    const orderWithProduct = await AllCustomerAndProductDetails.findOne({
      "productDetails._id": productObjectId
    });

    // Check if an order was found
    if (!orderWithProduct) {
      console.log("No order found with product ID:", productObjectId);
      return res.status(404).json({ code: 404, message: "Product not found in order" });
    }

    console.log("Order found:", orderWithProduct);

    // Update the document to remove the product from the productDetails array
    const updatedDocument = await AllCustomerAndProductDetails.updateOne(
      { "productDetails._id": productObjectId },
      { $pull: { productDetails: { _id: productObjectId } } },
      { new: true }
    );

    // Check if any document was found and updated
    if (updatedDocument.modifiedCount === 0) {
      console.log("Product was not removed:", productObjectId);
      return res.status(404).json({ code: 404, message: "Product not found in order" });
    }

    return res.status(200).json({
      code: 200,
      message: "Product removed successfully.",
      data: updatedDocument,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Server error", error: error.message });
  }
};

module.exports = {
  createDataCustomerAndProduct,
  getAllDataCustomerAndProduct,
  getDataByOrderId,
  getDataByShopId,
  updateDataCustomerAndProduct,
  deleteDataCustomerAndProduct,
  deleteAllDataCustomerAndProduct,
  deleteProductFromOrder
};
