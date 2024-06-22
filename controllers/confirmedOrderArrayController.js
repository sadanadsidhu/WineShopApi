const ConfirmOrder = require("../models/confirmedOrderArrayModel");
const AllDeliveryBoyRegisterData = require("../models/deliverBoyRegistrationModel");
const Product = require("../models/wineSubCategoriesModel");
const Customer = require("../models/customberRegisterModel");
const CustomerAddress = require("../models/customerCurrentAddressAndPermanentAddressModel");
const Shop = require("../models/wineShopModel");
const mongoose = require("mongoose");
const addConfirmOrder = async (req, res) => {
  try {
    const { confirmOrderId, delevaryBoyId } = req.body;

    const newConfirmOrder = new ConfirmOrder({
      confirmOrder: confirmOrderId,
      delevaryBoyId: delevaryBoyId,
    });

    await newConfirmOrder.save();

    res.status(201).json({
      message: "Confirm order added successfully",
      confirmOrder: confirmOrderId,
      delevaryBoyId: delevaryBoyId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
////////////////////////get confirm order ///////////////////////////////////////////////
const getConfirmOrders = async (req, res) => {
  const { delevaryBoyId } = req.params;
  try {
    const orders = await ConfirmOrder.find({ delevaryBoyId })
      .populate({
        path: 'confirmOrder',
        populate: [
          {
            path: 'customerAddress',
            model: 'CustomerAddress',
          },
          {
            path: 'productDetails',
            model: 'SubWineCategory',
          },
          {
            path: 'shopDetails',
            model: 'WineShop',
          },
        ],
      })
      .populate('delevaryBoyId');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/////////////////////// delete confirm id /////////////////////////////////////////////
const deleteConfirmedOrderById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the _id from the request parameters

    // Ensure that the provided id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Find the document in ConfirmOrder by _id and delete it
    const deletedOrder = await ConfirmOrder.findByIdAndDelete(id);

    // If the document is not found
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return success response
    return res.status(200).json({
      message: "Confirmed order deleted successfully",
      data: deletedOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addConfirmOrder,
  getConfirmOrders,
  deleteConfirmedOrderById
};
