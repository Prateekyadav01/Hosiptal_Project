import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
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


export const orderGenerate = async(amount)=>{
    try {
        console.log(amount);
        const response = await axios.post(`${baseUrl}/payment/order`, {
            amount
        },{
          })
          console.log(response)
          return response.data;
    } catch (error) {
        console.log("Gneration razorPay token error" , error);
    }
}


export const verifyOrder = async(data)=>{
    try {
      const options = {
          key: import.meta.env.RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          name: "Prateek hospital",
          description: "Test Mode",
          order_id: data.id,
          handler: async (response) => {
              console.log("response", response)
              try {
                // const res = await axios.post()
                  const res = await fetch(`${baseUrl}/payment/verify`, {
                      method: 'POST',
                      headers: {
                          'content-type': 'application/json'
                      },
                      body: JSON.stringify({
                          razorpay_order_id: response.razorpay_order_id,
                          razorpay_payment_id: response.razorpay_payment_id,
                          razorpay_signature: response.razorpay_signature,
                      })
                  })
  
                  const verifyData = await res.json();
                  console.log("data------------>",verifyData);
                  if (verifyData.message) {
                      toast.success(verifyData.message)
                  }
              } catch (error) {
                  console.log(error);
              }
          },
          theme: {
              color: "#5f63b8"
          }
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
     console.log(error);
    }
 }