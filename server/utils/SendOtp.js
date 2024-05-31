// const nodemailer = require("nodemailer")
import nodemailer from "nodemailer"
import {OTP} from '../models/otp.model.js'

export const mailSender = async (email, title, body) => {
  try {
    console.log("-----------> In a transporter" , email , title);
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    })


    let info = await transporter.sendMail({
      from: `"Prateek | HealthCare" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${OTP}`, // html body
    })
    console.log(info.response)
    return info
  } catch (error) {
    console.log(error.message)
    return error.message
  }
}

// module.exports = mailSender