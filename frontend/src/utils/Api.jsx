import axios from 'axios';
const baseUrl = "http://localhost:3000/api/v1";
// const render = https://hosiptal-project.onrender.com/api/v1
export const signup = async ({ email, name, password, address, phoneNumber, aadharNumber, application, role }) => {
    try {

        const response = await axios.post(`${baseUrl}/auth/userSignup`, {
            email,
            name,
            password,
            address,
            aadharNumber,
            phoneNumber,
            application,
            role
        }, {
            // withCredentials:true
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
    finally {
        console.log(email, name, password, address, phoneNumber, aadharNumber, application, role);
    }
};


export const register = async({email,password,role})=>{
    try{
        console.log("from frotend---->",email,password,role);
        const response = await axios.post(`${baseUrl}/auth/register` ,
            {
                email,
                password,
                role
            },
            
        )
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}


export const OTPCheck = async(email,otp)=>{
    console.log(email+"     " +  otp)
    try {
        const response = await axios.post(`${baseUrl}/auth/sendotp`, {
            email,
            otp
        },{
          })
        return response.data;
    } catch (error) {
        console.log("error getting verify in otp", error);
    }
}

export const appointAPI = async(department,patientName,date,time)=>{
    try {
        console.log(department,patientName,date,time)
        const response = await axios.post(`${baseUrl}/appoint/appointcheck`, {
            department,
            patientName,
            date,
            time
        },{
          })
        return response.data;
    } catch (error) {
        console.log("error in taking appointment", error);
    }
}