import axios from 'axios';


export const signup = async(email, name , password, address,aadharNumber,application)=>{
    try {
        const response = await axios.post("/api/v1/auth/signup",{
            email:email,
            name:name,
            password:password,
            address: address? address :"",
            aadharNumber: aadharNumber? aadharNumber :"",
            application: application? application :""
        },{})

        return response.data;
    } catch (error) {
        console.error(error);
    }
}