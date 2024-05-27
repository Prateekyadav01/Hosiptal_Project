import axios from 'axios';

export const signup = async ({ email, name, password, address, phoneNumber, aadharNumber, application, role }) => {
    try {

        const response = await axios.post("https://hosiptal-project.onrender.com/api/v1/auth/userSignup", {
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
        const response = await axios.post("https://hosiptal-project.onrender.com/api/v1/auth/register" ,
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
