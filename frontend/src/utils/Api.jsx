import axios from 'axios';

export const signup = async ({ email, name, password, address, phoneNumber, aadharNumber, application, role }) => {
    try {

        const response = await axios.post("http://localhost:3000/api/v1/auth/userSignup", {
            email,
            name,
            password,
            address,
            aadharNumber,
            phoneNumber,
            application,
            role
        }, {

        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
    finally {
        console.log(email, name, password, address, phoneNumber, aadharNumber, application, role);
    }
};
