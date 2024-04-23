const instance=require('../index');
const dotenv = require("dotenv").config();
const crypto=require("crypto")
const Payment=require("../models/paymentGetWayModel")

const checkout = async (req, res) => {
    try {
      const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
      };
      const order = await instance.orders.create(options);
  
      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: error.message,
      });
    }
  };
//////////////////////////////
const paymentverification = async (req, res) => {
    console.log(req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest('hex');

    console.log("sig received ", razorpay_signature);
    console.log("sig generated ", expectedSignature);


    const isAuthentic=expectedSignature===razorpay_signature;

    if(isAuthentic){

        await Payment.create({
        razorpay_order_id,
        razorpay_payment_id, 
        razorpay_signature
    })
    }
    if (razorpay_signature === expectedSignature) {
        res.redirect(
            `http://localhost:3000/paymentsuccess?refrence=${razorpay_payment_id}`
        );
    } else {
        res.status(400).json({
            success: false,
            message: 'Payment verification failed. Signatures do not match.',
        });
    }
};


/////////////////////////////////////////////////////
const getApiKey = (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
  };

module.exports = {
    checkout,
    paymentverification,
    getApiKey
  };