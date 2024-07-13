import React, { useState } from 'react';
import { register } from '../../utils/Api';
import toast, { Toaster } from 'react-hot-toast';
import { Outlet, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../../utils/slice/userSlice';
import { ThreeDots } from 'react-loader-spinner'; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(false);
  const [value, setValue] = useState('Patient Login');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRole = () => {
    setRole((prevRole) => {
      const newRole = !prevRole;
      setValue(newRole ? 'Doctor Login' : 'Patient Login');
      return newRole;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    console.log(role);
    console.log(role===false ? "patient" : "doctor");
    const data = await register({
      email,
      password,
      role: !role ? 'patient' : 'doctor',
    });
    console.log(data, '------>Form submitted');
    setLoading(false); 
    if (data.statusCode==200) {
      dispatch(setUser({
        user: data?.data?.user,
        isLoggedIn: true,
        isAdmin: role,
      }));
      toast.success("Registered Successfully");
      navigate("/");
    } else {
      console.log(data)
      toast.error(data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-200 to-yellow-200 ">
      <div className="login-container bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-center text-2xl mb-4 font-bold">Register</h2>
        <h3 
          className="bg-black text-white py-2 px-4 rounded-md text-center cursor-pointer mb-4"
          onClick={handleRole}
        >
          {value}
        </h3>
        {loading ? (
          <div className="flex justify-center items-center">
            <ThreeDots color="#00BFFF" height={80} width={80} /> {/* Loader component */}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
              required
              disabled={loading} 
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
              required
              disabled={loading} 
            />
            <button
              type="submit"
              className="w-full bg-pink-500 text-white px-4 py-2 rounded-md text-center font-semibold transition-colors duration-300 ease-in-out hover:bg-pink-600"
              disabled={loading} 
            >
              Register
            </button>
          </form>
        )}
        <div className="flex justify-center mt-4">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <a href="/login" className="text-blue-500 hover:text-blue-700 ml-1 font-semibold">
            Signup
          </a>
        </div>
      </div>
      <Toaster />
      <Outlet />
    </div>
  );
};

export default Register;
