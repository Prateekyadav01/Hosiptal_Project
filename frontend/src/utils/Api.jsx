import axios from 'axios';

export const signup = async ({ email, name, password, address, phoneNumber, aadharNumber, application, role }) => {
  try {
    const response = await axios.post("/api/v1/auth/userSignup", {
      email,
      name,
      password,
      address: address || "",
      aadharNumber: aadharNumber || "",
      phoneNumber: phoneNumber || "",
      application: application || "",
      role
    }, {
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
