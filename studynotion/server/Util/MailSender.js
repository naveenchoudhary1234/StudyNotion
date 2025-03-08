const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465, 
      secure: true, 
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, 
      },
      timeout: 10000, 
    });

    let info = await transporter.sendMail({
      from: 'StudyNotion || Codewithjaat - by Naveen Choudhary',
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent:", info);
    return info;

  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = mailSender;
