import React, { useState } from 'react';
import { signup } from '../../utils/Api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getEmail } from '../../utils/slice/otpEmail';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [application, setApplication] = useState('');
  const [patient, setPatient] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleRoleChange = () => {
    setPatient((prev) => !prev);
  };

  const handleApiSignup = async () => {
    try {
      const data = await signup({
        name,
        email,
        password,
        aadharNumber,
        phoneNumber,
        address,
        application,
        role: patient ? 'patient' : 'doctor',
      });
      console.log(data);
      if (data) {
        toast.success('Signup successful');
        dispatch(getEmail(email));
        navigate('/otp-verify');
      }
      // Clear form fields after successful signup
      setName('');
      setEmail('');
      setPassword('');
      setAadharNumber('');
      setPhoneNumber('');
      setAddress('');
      setApplication('');
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleApiSignup();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 via-red-200 to-pink-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {patient ? 'Patient Signup' : 'Doctor Signup'}
        </h2>
        <div className="mb-4 flex justify-center">
          <button
            onClick={handleRoleChange}
            className="bg-gray-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            {patient ? 'Are you a Doctor?' : 'Are you a Patient?'}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 ">
          <input
            className="input-field p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleInputChange(setName)}
            required
          />
          <input
            className="input-field p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange(setEmail)}
            required
          />
          <input
            className="input-field p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange(setPassword)}
            required
          />
          {patient ? (
            <input
              className="input-field p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="number"
              placeholder="Aadhar Number"
              value={aadharNumber}
              onChange={handleInputChange(setAadharNumber)}
            />
          ) : (
            <input
              className="input-field p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="number"
              placeholder="Application ID"
              value={application}
              onChange={handleInputChange(setApplication)}
            />
          )}
          <input
            className="input-field p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={handleInputChange(setPhoneNumber)}
          />
          {patient && (
            <textarea
              className="input-field p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 h-20"
              placeholder="Address"
              value={address}
              onChange={handleInputChange(setAddress)}
            />
          )}
          <button
            type="submit"
            className="bg-black hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Signup
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <span onClick={() => navigate('/register')} className="text-blue-500 hover:text-yellow-700 cursor-pointer">
            Register
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
