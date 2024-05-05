import React, { useState } from 'react';
import Button from '../common/Button';
import { signup } from '../../utils/Api';
import { useDispatch, useSelector } from 'react-redux';
import { getValue } from '../../utils/slice/roleSlice';

const Login = () => {
  const dispatch = useDispatch();
  const selector = useSelector((store)=>store?.role);
  // console.log(selector);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [application, setApplication] = useState('');

  const [doctor, setDoctor] = useState(false);
  const [patient, setPatient] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAadharNumberChange = (event) => {
    setAadharNumber(event.target.value);
  };

  const handleApplicationChange = (event) => {
    setApplication(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleApiSignup = async()=>{
    const data = await signup({
      name,
      email,
      password,
      aadharNumber,
      phoneNumber,
      address,
      application,
      role: selector ? "Doctor" :"Patient",
    })
    console.log(data);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your login logic here
    const formData = {
      name,
      email,
      password,
      aadharNumber,
      phoneNumber,
      address,
      application,
    };

    handleApiSignup();
    // console.log(data);
    console.log('Form Data:', formData);
    // Reset form fields after submission
    setName('');
    setEmail('');
    setPassword('');
    setAadharNumber('');
    setPhoneNumber('');
    setAddress('');
  };

  const handleChangeDoctor = () => {
    console.log(patient,doctor)
    setDoctor(true);
    setPatient(false);
    dispatch(getValue(patient));
  };

  const handleChangePatient = () => {
    console.log(patient,doctor)
    setDoctor(false);
    setPatient(true);
    dispatch(getValue(patient));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen mt-8">
      <div className="m-2">
        <Button data={patient} function={handleChangeDoctor} function1={handleChangePatient}/>
        {/* <button
          onClick={handleChangePatient}
          className={`ml-4 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            patient ? 'bg-blue-700' : ''
          }`}
        >
          Are you a Patient
        </button> */}
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {patient ? (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Aadhar Number:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                value={aadharNumber}
                onChange={handleAadharNumberChange}
              />
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Application Id:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                value={application}
                onChange={handleApplicationChange}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          {patient && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address:
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={address}
                onChange={handleAddressChange}
              />
            </div>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
