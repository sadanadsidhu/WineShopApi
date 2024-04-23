const CustomerAddress=require('../models/customerCurrentAddressAndPermanentAddressModel')
const Customer=require('../models/customberRegisterModel')

////////////////////////// POST LOCAL ADDRESS ----------------------->>>>>>>>>>>>>>>>>>>>>>>
const addLocalAddress = async (req, res) => {
    try {
        const { localAddress,customerPermanentAddress } = req.body;
        const addToCartDoc = new CustomerAddress({ localAddress,customerPermanentAddress });
        await addToCartDoc.save();

        // const customer = await Customer.findOne({ mobileNumber });

        // Check if a customer with the provided mobile number exists
        // if (!customer || customer.mobileNumber !== mobileNumber) {
        //     return res.status(404).json({ code: 404, message: 'Customer not found or mobileNumber does not match' });
        // }
        const savedDoc = await CustomerAddress.findById(addToCartDoc._id).select('quantity totalPrice ml cart');
        return res.status(200).json({ 
            code: 200, 
            message: 'Address added successfully.', 
            data: savedDoc
        });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};
//////////////////////////GET LOCAL ADDRESS-------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getLocalAddress = async (req, res) => {
    try {
        const { mobileNumber } = req.params;
        // const cartData = await CustomerAddress.find().populate('customerPermanentAddress');
        const cartData = await CustomerAddress.find({mobileNumber}).populate('customerPermanentAddress');
        if (!cartData || cartData.length === 0) {
            return res.status(404).json({ code: 404, message: 'Customer Address not found' });
        }
        return res.status(200).json({ code: 200, message: 'Customer address retrieved successfully.', data: cartData });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

const updateLocalAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const { localAddress, customerPermanentAddress } = req.body;
        const updatedAddress = await CustomerAddress.findByIdAndUpdate(id, { localAddress, customerPermanentAddress }, { new: true });
        if (!updatedAddress) {
            return res.status(404).json({ code: 404, message: 'Local address not found' });
        }
        return res.status(200).json({ code: 200, message: 'Local address updated successfully', data: updatedAddress });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

const deleteLocalAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAddress = await CustomerAddress.findByIdAndDelete(id);
        if (!deletedAddress) {
            return res.status(404).json({ code: 404, message: 'Local address not found' });
        }
        return res.status(200).json({ code: 200, message: 'Local address deleted successfully', data: deletedAddress });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};

const deleteAllLocalAddresses = async (req, res) => {
    try {
        const deleteResult = await CustomerAddress.deleteMany({});
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ code: 404, message: 'No local addresses found to delete' });
        }
        return res.status(200).json({ code: 200, message: 'All local addresses deleted successfully' });
    } catch (error) {
        return res.status(500).json({ code: 500, message: 'Server error', error: error.message });
    }
};


module.exports = {
    addLocalAddress,
    getLocalAddress,
    updateLocalAddress,
    deleteLocalAddress,
    deleteAllLocalAddresses
};