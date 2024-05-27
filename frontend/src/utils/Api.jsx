import axios from 'axios';
const baseURL = "https://hosiptal-project.onrender.com/api/v1";
export const signup = async ({ email, name, password, address, phoneNumber, aadharNumber, application, role }) => {
    try {

        const response = await axios.post(`${baseURL}/auth/userSignup`, {
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
        const response = await axios.post(`${baseURL}/auth/register` ,
            {
                email,
                password,
                role
            },{
                withCredentials:true
            }
        )
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}
