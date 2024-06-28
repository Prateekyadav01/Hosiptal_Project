// const nodemailer = require("nodemailer")
import nodemailer from "nodemailer"
import {OTP} from '../models/otp.model.js'

export const mailSender = async (email, title, body,otp) => {
  try {
    console.log("-----------> In a transporter" , email  ,otp);
    const emailCheck = await OTP.find({email});
    if(!emailCheck){
      return res.status(400).json({
        message: "Email not found"
      })
    }
    // 
    const otpValue = emailCheck.otp;
    console.log("------------->", otp);
    console.log(process.env.MAIL_PASS);
    let transporter = nodemailer.createTransport({
      //host: process.env.MAIL_HOST,
      
      service:"gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    })
console.log("transport done");

    let info = await transporter.sendMail({
      from: `"Prateek | HealthCare" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    })
    console.log("infor",info.response)
    return info
  } catch (error) {
    console.log("transportor",error)
    return error;
  }
}

// module.exports = mailSender