


export const sendOTPVerification = async(req,res)=>{
    try {
        const {email} = req.body;
        
    } catch (error) {
        console.log(error +"---------->otp error");
    }
}

// signup  ----> (verfiy otp) -->sign succefuly (email)
// otp

// signup   email password user naem
//  otp (email)----> otp