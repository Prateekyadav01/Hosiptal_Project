import { OTP } from "../models/otp.model.js";

export const sendOTPVerification = async (req, res) => {
    try {
        const { email, otp } = req.body;

        
        const emailExisting = await OTP.findOne({ email });

        // Check if the email is registered
        if (!emailExisting) {
            return res.status(400).json({
                message: "Email is not registered"
            });
        }

        // Verify the provided OTP with the stored OTP
        console.log("existingOTP-----", emailExisting.otp)
        if (emailExisting.otp !== otp) {
            return res.status(400).json({
                message: "Incorrect OTP"
            });
        }

        console.log(emailExisting);

        return res.status(200).json({
            message: "OTP Verified"
        });

    } catch (error) {
        console.log(error + "---------->otp error");
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
