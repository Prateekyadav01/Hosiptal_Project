import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { OTPCheck } from '../../utils/Api';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const OtpConfirmation = () => {
  const selector = useSelector((store) => store.email.email);
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkingOTP();
  };

  const checkingOTP = async () => {
    try {
      console.log(otp);
      const response = await OTPCheck(selector, otp);
      console.log(response);
      if (response) {
        console.log("verified");
        setMessage("OTP Verified");
        toast.success("OTP Verified");
        navigate('/register');
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setMessage("Invalid OTP");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-200 to-blue-200">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center text-gray-800">{`OTP Sent to ${selector}`}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700">Enter OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
              maxLength="6"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 transition duration-300"
          >
            Confirm OTP
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default OtpConfirmation;
