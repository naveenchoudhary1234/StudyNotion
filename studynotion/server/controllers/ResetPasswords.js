const User = require("../Model/User");
const mailSender = require("../Util/MailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const FRONTEND_URL = "http://localhost:3000";


// get email from body
// validation
// generate token user k pas khud ka ek token hogaa aur expiry time hoga taki vo apna passoword reset kr skee
// generate token by using crypto
// generate user by addin token and expieing time
// create url
// send mail containg the url
// return response
exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email
    // find email
    const user = await User.findOne({ email: email })
     // check email prsemt or not
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      })
    }

    // return response


    const token = crypto.randomBytes(20).toString("hex")

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    )
    console.log("DETAILS", updatedDetails)

    const url = `${FRONTEND_URL}/update-password/${token}`;


    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    )

    res.json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    })
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    })
  }
}


////  data fetch
// validation
//  check the token is same
// get user etails from token thats why we add out token into user
// token time check
// hash the password
// return response 


exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      })
    }
    const userDetails = await User.findOne({ token: token })
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      })
    }
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      })
    }
    const encryptedPassword = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    )
    res.json({
      success: true,
      message: `Password Reset Successful`,
    })
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    })
  }
}