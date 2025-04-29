// step 1 create an order api
// step 2 hme luch options add krne pdte hain
// step 3 amount k case m *100 krdoo
// step 4 store field in your server
// and we ordered always order id created
// ** verify payment signature
// order states
//1 created
// 2 attempted
// 3 paid
// creaeted-authorized-captured
// failed refunded

// payment Integraiton -two step process
// 1 capture paymemnt (courseId,UserId)
// web Hook - rajorpay p ek notifaction set krdia jb bhii ek succesful payment ho jaye tb ek api hit krdena and thr api key is our
// and we use secret key in web hook and ek secret key apne backend p pii hai
// agr dono match ho jati h to payment succesful
// npm i razorpay


// const {instance}=require("../config/razorpay");
// const Course=require("../models/Course");
// const User=require("../models/User");
// const mailSender=require("../utils/MailSender");
// const{courseEnrollment}=require("../mail/templates/courseEnrollmentEmail");
// const mongoose = require('mongoose');
// const Razorpay = require("razorpay");
// const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail");




// // capture the payment
// exports.capturePayment=async(req,res)=>{
// try{
// // get course id and user id
// const{course_Id}=req.body;
// const userId=req.user.id;

// if(!courseId){
//     return res.status(500).json({
//         success:false,
//         message:"plz provide course id"
//     });
// }

// let course;

// course=await Course.findById({course_Id});

// if(!course){
//     return res.status(500).json({
//         success:false,
//         message:"could not find the course",
//     });


// }



// // same user khi dobara to vhi course buy nhi kr rha hain
// const uid = mongoose.Types.ObjectId(userId);
// if(course.studentsEnrolled.includes(uid)){
// return res.status(200).json({
//     success:false,
//     message:"student is enrolled already in course",
// })

// }




// /// create

// const amount=course.price;
// const currency="INR";
// const options={
// amount:amount*100,
// currency,
// recipt:Math.random(Date.now().toString()),
// notes:{
//     course_Id,
//     userId,
// },
// }



// try{
// // intiate the payment using Razorpay
// const paymentResponse=await instance.orders.create(options);
// console.log(paymentResponse);
// return res.status(200).json({
//     success:true,
//     message:"completed",
//     courseName:course.courseName,
//     courseDescription:course.courseDescription,
//     courseThumbnail:course.courseThumbnail,
//     orderId:paymentResponse.id,
//     currency:paymentResponse.currency,
//     amount:paymentResponse.amount,
    


// })


// }

// catch(error){

//     console.log(error);
//     return res.status(500).json({
//         success:false,
//         message:"could not payment",
//     })
// }





// }

// catch(error){
//     return res.status(500).json({
//         success:false,
//         message:"payment m dikkt hain",
//     });


// }
// }




// /// for verification

// exports.verifySignature=async(req,res)=>{

// try{
// const webhookSecret="12345678";

// // ye razor pay s aaya hain
// const signature=req.headers("x-razorpay-signature");

// // razorpay ye drect to nhi bejega kuch encrypted format m beja h 

// // hm webhook k secret ko encrypt kra denge kuki uskod eocde to hm kr nhi sktee
// // hashed based messad autheentication
// // hashing algorithm,secret key two option in hmac
// // step1
// const shasum=crypto.createHmac("sha256",webhookSecret);

// // step2
// //convert to string
// shasum.update(JSON.stringify(req.body));

// const digest=shasum.digest("hex");


// // sinature autr digest ko match krnaa hain

// if(signature===digest){
//     console.log("payment is auhtorized");
    
// const{userId,courseId}=req.body.payload.payment.entity.notes;

// try{
// // action doing
// // find the course and enroll the student in it
// const enrolledCourse=await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true});

// if(!enrolledCourse){
//     return res.status(500).json({
//         success:false,
//         message:"course not found",
//     });
// }


// console.log(enrolledCourse);


// // find the student and added the course to theri list enrolled

// const enrolledStudent=await User.findOneAndUpdate({_id:userId},{push:{courses:courseId}},{new:true});

// console.log(enrolledStudent);

// // ab mail send krdoo confirmation kiii

// const emailResponse=await mailSender(
// enrolledStudent.email,
// "congratulations from choudhary wih code",
// "Congratulations,you are onboared into new course",


// );

// console.log(emailResponse);
// return res.status(200).json({
//     success:true,
//     message:"succesfully send the email",
// })



// }

//  catch(error){

// console.log(error);
// return res.status(500).json({
//     success:false,
//     message:"something wrong",
// });


//  }











// }

// // course ki id aur course ki id is br razorpay s aayegii
// // to hm notes k andar pass kiya thaa








// }



// catch(error){
//     return res.status(500).json({
//         success:false,
//         message:"payment m dikkt hain",
//     });


// }






// }

const{instance}=require("../config/razorpay");
const Course = require("../Model/Course");
const crypto = require("crypto");
const User = require("../Model/User");
const mailSender = require("../Util/MailSender");
const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.RAJORPAY_SECRET);


const {
  courseEnrollmentEmail,
} = require("../Mail/Template/CourseEnrollmentEmail");
const { paymentSuccessEmail } = require("../Mail/Template/PaymwntSuccessEmail");
const CourseProgress = require("../Model/CourseProgress");

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  console.log(courses);
  const userId = req.user.id;
  console.log(userId);
  if (!courses.length) {
    return res.json({ success: false, message: "Please Provide Course ID" });
  }
  // for checkout we calculate the total amount 
  let total_amount = 0;
  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" });
      }
      const uid = new mongoose.Types.ObjectId(userId);
      console.log(uid);
      if (course.studentsEnroled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" });
      }
      total_amount += course.price;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };
  try {
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);
    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." });
  }
};

exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;
  console.log(razorpay_order_id);
  console.log(razorpay_payment_id);
  console.log(razorpay_signature);
  console.log(courses);
  console.log
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" });
  }
  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAJORPAY_SECRET)
    .update(body.toString())
    .digest("hex");
  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res);
    return res.status(200).json({ success: true, message: "Payment Verified" });
  }
  return res.status(200).json({ success: false, message: "Payment Failed" });
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("error in sending mail", error);
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" });
  }
};

const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Please Provide Course ID and User ID",
      });
  }

  for (const courseId of courses) {
    try {
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnroled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" });
      }
      console.log("Updated course: ", enrolledCourse);

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      });

      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      );

      console.log("Enrolled student: ", enrolledStudent);

      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      );

      console.log("Email sent successfully: ", emailResponse.response);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: error.message });
    }
  }
};








