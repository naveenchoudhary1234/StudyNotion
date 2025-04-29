const Razorpay=require("razorpay");
require("dotenv").config();


exports.instance=new Razorpay({

key_id:process.env.RAJORPAY_KEY,
key_secret:process.env.RAJORPAY_SECRET,




});

