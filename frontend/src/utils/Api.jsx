import axios from 'axios';


export const signup = async({email, name , password, address,aadharNumber,application,role})=>{
    try {
        const response = await axios.post("api/v1/auth/userSignup",{
            email:email,
            name:name,
            password:password,
            address: address? address :"",
            aadharNumber: aadharNumber? aadharNumber :"",
            application: application? application :"",
            role
        },{})

        return response.data;
    } catch (error) {
        console.error(error);
    }
}