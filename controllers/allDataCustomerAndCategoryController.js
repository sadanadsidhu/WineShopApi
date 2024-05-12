
const AllCustomerAndProductDetails = require('../models/allDataCustomerAndCategoryModel');

const generateOrderId = () => {
    // Generate a random 6-digit number
    return Math.floor(100000 + Math.random() * 900000);
};
////////////////////////////////////////////////// CREATE ORDER /////////////////////////////////////////
const createDataCustomerAndProduct = async (req, res) => {
    try {
        
        const orderId = generateOrderId();

        const { totalPriceSum, deliveryCharges, serviceCharges, grandTotalPrice,paymentId, customerAddress, productDetails, shopDetails } = req.body;
        const newData = new AllCustomerAndProductDetails({
            orderId,
            totalPriceSum,
            deliveryCharges,
            serviceCharges,
            grandTotalPrice,
            paymentId,
            customerAddress,
            productDetails,
            shopDetails
        });
        const savedData = await newData.save();
        return res.status(201).json({ code: 201, message: 'Data created successfully.', data: savedData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
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
            .populate('productDetails') // Correct reference name
            .populate('shopDetails')
            .populate('customerAddress');

        return res.status(200).json({
            code: 200,
            message: 'All data retrieved successfully.',
            data: allData
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: 'Server error',
            error: error.message
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
            return res.status(404).json({ code: 404, message: 'Data not found' });
        }

        // Return the data
        return res.status(200).json({ code: 200, message: 'Data retrieved successfully.', data });
    } catch (error) {
        // Handle error
        console.error(error);
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

////////////////////////////////////////GET DATA ACCORDING TO SHOPID ////////////////////////////////////
const getDataByShopId = async (req, res) => {
    try {
        const { shopId } = req.params;

        // Find data based on shopId
        const data = await AllCustomerAndProductDetails.find({ shopDetails: shopId })
            .populate('SubWineCategory')
            .populate('shopDetails')
            .populate('customerAddress');

        if (!data) {
            return res.status(404).json({ code: 404, message: 'Data not found' });
        }

        return res.status(200).json({ code: 200, message: 'Data retrieved successfully.', data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
}

///////////////////////////////////////// UPDATE OSERDER ACCORDING ID /////////////////////////////////////
const updateDataCustomerAndProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const updatedData = await AllCustomerAndProductDetails.findByIdAndUpdate(id, newData, { new: true });

        if (!updatedData) {
            return res.status(404).json({ code: 404, message: 'Data not found' });
        }

        return res.status(200).json({ code: 200, message: 'Data updated successfully.', data: updatedData });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};
//////////////////////////////////////////// DELETE ORDER ACCORDING TO ID /////////////////////////////////////////////////
const deleteDataCustomerAndProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedData = await AllCustomerAndProductDetails.findByIdAndDelete(id);

        if (!deletedData) {
            return res.status(404).json({ code: 404, message: 'Data not found' });
        }

        return res.status(200).json({ code: 200, message: 'Data deleted successfully.', data: deletedData });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

/////////////////////////////////////////////////// DELETE ALL AT ONE TIME /////////////////////////////
const deleteAllDataCustomerAndProduct = async (req, res) => {
    try {
        // Delete all documents in the collection
        await AllCustomerAndProductDetails.deleteMany({});

        // Return success response
        return res.status(200).json({ code: 200, message: 'All data deleted successfully.' });
    } catch (error) {
        // Handle error
        console.error(error);
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

module.exports = {
    createDataCustomerAndProduct,
    getAllDataCustomerAndProduct,
    getDataByOrderId,
    getDataByShopId,
    updateDataCustomerAndProduct,
    deleteDataCustomerAndProduct,
    deleteAllDataCustomerAndProduct
};
