import mongoose from 'mongoose'
import { mailSender } from '../utils/SendOtp.js'
import { otpTemplate } from '../mail/templates/emailVerification.js';




const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires:60*5
    }
},{
    timestamps:true 
})


async function sendVerificationEmail(email,otp){
    try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			otpTemplate(otp),
            otp
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

otpSchema.pre('save',async function(next){
    console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	} 
	next();
})



export const OTP = mongoose.model('OTP', otpSchema);