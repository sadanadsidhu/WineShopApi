const AllCustomerAndProductDetails = require('../models/allDataCustomerAndCategoryModel');

const createDataCustomerAndProduct = async (req, res) => {
    try {
        const { totalPriceSum, deliveryCharges, serviceCharges, grandTotalPrice, customerAddress, productDetails, shopDetails } = req.body;
        const newData = new AllCustomerAndProductDetails({
            totalPriceSum,
            deliveryCharges,
            serviceCharges,
            grandTotalPrice,
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

//////////////////get
const getAllDataCustomerAndProduct = async (req, res) => {
    try {
        const allData = await AllCustomerAndProductDetails.find()
            .populate('customerAddress')
            .populate('productDetails')
            .populate('shopDetails');

        return res.status(200).json({ code: 200, message: 'All data retrieved successfully.', data: allData });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

// UPDATE data
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

module.exports = {
    createDataCustomerAndProduct,
    getAllDataCustomerAndProduct,
    updateDataCustomerAndProduct,
    deleteDataCustomerAndProduct
};