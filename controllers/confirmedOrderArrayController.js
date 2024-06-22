const ConfirmOrder = require("../models/confirmedOrderArrayModel");
const AllDeliveryBoyRegisterData = require("../models/deliverBoyRegistrationModel");
const Product = require("../models/wineSubCategoriesModel");
const Customer = require("../models/customberRegisterModel");
const CustomerAddress = require("../models/customerCurrentAddressAndPermanentAddressModel");
const Shop = require("../models/wineShopModel");
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
            populate: {
              path: 'customerPermanentAddress',
              model: 'Customer',
              select: 'mobileNumber username email localAddress',
            },
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

module.exports = {
  addConfirmOrder,
  getConfirmOrders,
};
// const ConfirmOrder = require("../models/confirmedOrderArrayModel");
// const AllDeliveryBoyRegisterData = require("../models/deliverBoyRegistrationModel");
// const Product = require("../models/wineSubCategoriesModel");
// const Customer = require("../models/customberRegisterModel");
// const CustomerAddress = require("../models/customerCurrentAddressAndPermanentAddressModel");
// const Shop = require("../models/wineShopModel");
// const { model } = require("mongoose");

// const addConfirmOrder = async (req, res) => {
//   try {
//     const { confirmOrderId, delevaryBoyId } = req.body;

//     const newConfirmOrder = new ConfirmOrder({
//       confirmOrder: confirmOrderId,
//       delevaryBoyId: delevaryBoyId,
//     });

//     await newConfirmOrder.save();

//     res.status(201).json({
//       message: "Confirm order added successfully",
//       confirmOrder: confirmOrderId,
//       delevaryBoyId: delevaryBoyId,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const getConfirmOrders = async (req, res) => {
//   const { delevaryBoyId } = req.params;
//   try {
//     const orders = await ConfirmOrder.find({ delevaryBoyId })
//       .populate({
//         path: "confirmOrder",
//         populate: [
//           {
//             path: "customerAddress",
//             model: "CustomerAddress",
//             populate:
//               {
//                 path: "customerPermanentAddress",
//                model:"customerPermanentAddress"
//               },

//           },
//           {
//             path: "productDetails",
//             model: "SubWineCategory",
//           },
//           {
//             path: "shopDetails",
//             model: "WineShop",
//           },
//         ],
//       })
//       .populate("delevaryBoyId");

//     if (!orders || orders.length === 0) {
//       return res.status(404).json({ message: "Data not found" });
//     }

//     res.json({ orders });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// module.exports = {
//   addConfirmOrder,
//   getConfirmOrders,
// };
