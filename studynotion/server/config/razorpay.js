const Razorpay=require("razorpay");
require("dotenv").config();


exports.instance=new Razorpay({

key_id:process.env.API_KEY,
key_secret:process.env.API_SECRET,




});

