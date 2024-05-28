
import otpGenrator from 'otp-generator'
import { OTP } from '../models/otp.model';


export const sendOTPVerification = async(req,res)=>{
    try {
        const otp = otpGenrator.generate(6);
        
        const newOTP = new OTP({
            otp,
            user:user._id,
        })
        await newOTP.save();
        await sendEmail(req.body.email,otp);
        console.log(otp);
        return res.status(200).json({
            message:`OTP send Successfully + ${otp}`,
            success:true,
        })
    } catch (error) {
        console.log(error +"otp error");
    }
}