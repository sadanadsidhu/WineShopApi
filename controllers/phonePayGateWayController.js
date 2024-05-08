

// Constants for your application
// const {
//     MERCHANT_ID,
//     SALT_KEY,
//     SALT_INDEX,
//     APP_BE_URL,
//     PHONE_PE_HOST_URL
// } = require('../config/constants'); // Import your constants from the configuration file

// Function to initiate a payment
// const initiatePayment = async (req, res) => {
//     try {
//         // Transaction amount
//         const amount = +req.query.amount;

//         // User ID is the ID of the user present in your application's DB
//         let userId = "MUID123";

//         // Generate a unique merchant transaction ID for each transaction
//         let merchantTransactionId = uniqid();

//         // Construct the payload for initiating the payment
//         let normalPayLoad = {
//             merchantId: process.env.MERCHANT_ID,
//             merchantTransactionId: merchantTransactionId,
//             merchantUserId: userId,
//             amount: amount * 100, // Convert amount to paise
//             redirectUrl: `${process.env.APP_BE_URL}/payment/validate/${merchantTransactionId}`,
//             redirectMode: "REDIRECT",
//             mobileNumber: "9999999999",
//             paymentInstrument: {
//                 type: "PAY_PAGE",
//             },
//         };

//         // Encode the payload to base64
//         let bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
//         let base64EncodedPayload = bufferObj.toString("base64");

//         // Generate X-VERIFY checksum
//         let string = base64EncodedPayload + "/pg/v1/pay" + process.env.SALT_KEY;
//         let sha256_val = sha256(string);
//         let xVerifyChecksum = sha256_val + "###" + process.env.SALT_INDEX;

//         // Make the POST request to initiate the payment
//         const response = await axios.post(
//             `${process.env.PHONE_PE_HOST_URL}/pg/v1/pay`,
//             {
//                 request: base64EncodedPayload,
//             },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-VERIFY": xVerifyChecksum,
//                     accept: "application/json",
//                 },
//             }
//         );

//         // Redirect the user to the payment URL provided by PhonePe
//         res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send(error.message);
//     }
// };


const axios = require('axios');
const uniqid = require('uniqid');
const sha256 = require('sha256');
const dotenv = require("dotenv").config();

const MERCHANT_ID = "PGTESTPAYUAT";
const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const SALT_INDEX = 1;
const SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";

const initiatePayment = async (req, res) => {
    const { name, number, amount } = req.body;
    const paymentEndpoint="/pg/v1/pay";
    const merchantTransactionId=uniqid();
    const userId=123;
    const payload=  {
        "merchantId": MERCHANT_ID,
        "merchantTransactionId": merchantTransactionId,
        "merchantUserId": userId,
        "name":name,
        "amount": amount,
        "redirectUrl": `http://localhost:2020/redirect-url/${merchantTransactionId}`,
        "redirectMode": "REDIRECT",
        "mobileNumber": number,
        "paymentInstrument": {
            "type": "PAY_PAGE"
        }
    };

    const bufferObj = Buffer.from(JSON.stringify(payload), "utf8");
    const base64EncodedPayload = bufferObj.toString("base64");
    const xVerify= sha256(base64EncodedPayload+paymentEndpoint+SALT_KEY) + "###" + SALT_INDEX;

    const options = {
        method: 'post',
        url: `${PHONE_PE_HOST_URL}${paymentEndpoint}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            "X-VERIFY": xVerify
        },
        data: {
            request: base64EncodedPayload,
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error initiating payment");
    }
};

module.exports = {
    initiatePayment,
};


// const axios = require('axios');
// const sha256 = require('sha256');
// const uniqid = require('uniqid');

// class PhonePe {
//     constructor(merchant_id, salt_key, salt_index) {
//         if (!merchant_id) throw new Error("You must provide a Merchant Id");
//         this.merchant_id = merchant_id;
//         if (!salt_key) throw new Error("You must provide a Salt Key");
//         this.salt_key = salt_key;
//         if (!salt_index) throw new Error("You must provide a Salt Index");
//         this.salt_index = salt_index;
//     }

//     async paymentCall(merchantTransactionId, merchantUserId, amount, redirectUrl, callbackUrl, mobileNumber, mode = null) {
//         const paymentEndpoint = "/pg/v1/pay";
//         const payload = {
//             merchantId: this.merchant_id,
//             merchantTransactionId,
//             merchantUserId,
//             amount,
//             redirectUrl,
//             redirectMode: "POST",
//             callbackUrl,
//             mobileNumber,
//             paymentInstrument: {
//                 type: "PAY_PAGE"
//             }
//         };

//         const payload_str = JSON.stringify(payload);
//         const base64EncodedPayload = Buffer.from(payload_str).toString('base64');
//         const hashString = base64EncodedPayload + paymentEndpoint + this.salt_key;
//         const hashedValue = sha256(hashString) + "###" + this.salt_index;

//         const options = {
//             method: 'post',
//             url: `${PHONE_PE_HOST_URL}${paymentEndpoint}`,
//             headers: {
//                 accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 "X-VERIFY": hashedValue
//             },
//             data: {
//                 request: base64EncodedPayload,
//             }
//         };

//         try {
//             const response = await axios.request(options);
//             console.log(response.data);
//             return response.data;
//         } catch (error) {
//             console.error(error);
//             throw new Error("Error initiating payment");
//         }
//     }
// }

// const MERCHANT_ID = "PGTESTPAYUAT";
// const PHONE_PE_HOST_URL = " https://api-preprod.phonepe.com/apis/pg-sandbox";

// const phonePe = new PhonePe(MERCHANT_ID, "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399", 1);

// const initiatePayment = async (req, res) => {
//     const { name, number, amount } = req.body;
//     const merchantTransactionId = uniqid();
//     const userId = 123;

//     try {
//         const paymentResponse = await phonePe.paymentCall(merchantTransactionId, userId, amount,name,
//             `http://localhost:2020/redirect-url/${merchantTransactionId}`, number);
//         res.send(paymentResponse);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error initiating payment");
//     }
// };

// module.exports = {
//     initiatePayment
// };
