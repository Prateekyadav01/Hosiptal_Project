import React, { useState } from 'react';
import { register } from '../../utils/Api';
import toast, { Toaster } from 'react-hot-toast';
import { Outlet, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../../utils/slice/userSlice';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(false);
  const [value, setValue] = useState('Doctor Login');
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const handleRole = () => {
    setRole((prev) => !prev);
    setValue(role ? 'Doctor Login (click for patient)' : 'Patient Login (click for doctor)');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(role?"patient" :"doctor");
    const data = await register({
      email,
      password,
      role: role ? 'patient' : 'doctor',
    });
    console.log(data,'------>Form submitted');
    if(data){
      toast.success("Registered Successfully");
      if(role){
        dispatch(setUser({
          user: data?.data?.user,
          isLoggedIn:true,
          isAdmin:false,
        }))
        navigator("/");
      }
      else{
        dispatch(setUser({
          user: data?.data?.user,
          isLoggedIn:true,
          isAdmin:true,
        }))
        navigator("/");
      }

    }
    else{
      toast.error("Registration Failed")
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-200 to-yellow-200">
      <div className="login-container bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-center text-2xl mb-4 font-bold">Register</h2>
        <h3 className="text-center text-lg mb-6 cursor-pointer text-gray-600" onClick={handleRole}>
          {value}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white px-4 py-2 rounded-md text-center font-semibold transition-colors duration-300 ease-in-out hover:bg-pink-600"
          >
            Register
          </button>
        </form>
        <div className="flex justify-center mt-4">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <a href="/login" className="text-blue-500 hover:text-blue-700 ml-1 font-semibold">
            Log in
          </a>
        </div>
      </div>
      <Toaster/>
      <Outlet/>
    </div>
  );
};

export default Register;