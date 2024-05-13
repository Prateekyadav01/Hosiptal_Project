import React, { useState } from 'react';
import { signup } from '../../utils/Api';
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [application, setApplication] = useState('');
  const [patient, setPatient] = useState(true);
  const navigate = useNavigate('')

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
      if(data){
        navigate("/register")
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
    <div className="min-h-screen flex justify-center items-center bg-gray-100" style={{
      backgroundImage: "linear-gradient(rgb(255 225 209),rgb(249 159 159)",
    }}>
      <div className="bg-white p-8 rounded shadow-md w-full md:w-2/3 lg:w-1/2 m-10">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {patient ? 'Patient Signup' : 'Doctor Signup'}
        </h2>
        <div className="mb-4">
          <button
            onClick={handleRoleChange}
            className="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[30vw] flex justify-center ml-24 items-center  focus:outline-none focus:shadow-outline"
          >
            {patient ? 'Are you a Doctor?' : 'Are you a Patient?'}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            className="input-field"
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleInputChange(setName)}
            required
          />
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange(setEmail)}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange(setPassword)}
            required
          />
          {patient ? (
            <input
              className="input-field"
              type="number"
              placeholder="Aadhar Number"
              value={aadharNumber}
              onChange={handleInputChange(setAadharNumber)}
            />
          ) : (
            <input
              className="input-field"
              type="number"
              placeholder="Application ID"
              value={application}
              onChange={handleInputChange(setApplication)}
            />
          )}
          <input
            className="input-field"
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={handleInputChange(setPhoneNumber)}
          />
          {patient && (
            <textarea
              className="input-field h-20"
              placeholder="Address"
              value={address}
              onChange={handleInputChange(setAddress)}
            />
          )}
          <button
            type="submit"
            className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[30vw] flex justify-center ml-24 items-center  focus:outline-none focus:shadow-outline"
          >
            Signup
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a onClick={()=> navigate('/register')} className="text-blue-500 hover:text-blue-700">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
