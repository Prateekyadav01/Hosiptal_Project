import Razorpay from 'razorpay';
import crypto from 'crypto';
import 'dotenv/config';
import { Payment } from '../models/payment.model.js';


const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_SECRET;

    console.log("keyID ----------------->", key_id);
    console.log("keySecret ----------------->", key_secret);

    const razorpayInstance = new Razorpay({
        key_id,
        key_secret
    });

export const paymentOrder = async (req, res) => {
    const { amount } = req.body;

    

    try {
        const options = {
            amount: Number(amount * 100), 
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        razorpayInstance.orders.create(options, (error, order) => {
            console.log(options,"------------>",order)
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
            console.log(order);
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
};



export const verifyPayment = async(req,res)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    console.log("req.body", req.body);

    try {
        
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        

        const isAuthentic = expectedSign === razorpay_signature;

        // Condition 
        if (isAuthentic) {
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });

            // Save Payment 
            await payment.save();
            // await payment.save();

            // Send Message 
            res.json({
                message: "Payement Successfully"
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}