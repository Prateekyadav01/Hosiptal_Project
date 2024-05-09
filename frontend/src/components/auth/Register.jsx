import React, { useState } from 'react';
import { register } from '../../utils/Api';

const Register = () => {
  const [email ,setEmail] = useState('');
  const [password ,setPassword] = useState('');
  const [role,setRole] =useState(false);
  const [value,setValue] =useState('Are you a Doctor?');

  const handleRole =()=>{
    console.log(role);
    setRole((prev)=> !prev)
    setValue(role? 'Are you a Doctor?' : 'Are you a Patient?');
  }
  const handleSubmit = async(e) => {
    console.log(email,password)
    e.preventDefault();
    const data = await register({
      email,
      password,
      role : role ? "patient" :"doctor" 
    })
    // Add your registration logic here
    // Example: perform validation, fetch data, etc.
    console.log('Form submitted');
  };

  return (
    <div className="flex justify-center items-center h-screen" style={{
      backgroundImage: 'linear-gradient(rgb(255, 225, 209), rgb(249, 159, 159))',
    }}>
      <div className="login-container bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-center text-xl mb-4">Register</h2>
        <h3 className='text-center text-xl mb-4 cursor-pointer' onClick={handleRole}>{value}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border rounded-md"
            required
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 border rounded-md"
            required
          />
          <input
            type="submit"
            value="Register"
            className="w-full bg-black text-white px-4 py-2 rounded-md cursor-pointer text-center transition-colors duration-300 ease-in-out hover:bg-gray-600"
          />
        </form>
        <div className="flex justify-center mt-4">
          <p className="text-sm text-gray-600 mr-2">Already have an account?</p>
          <a href="/login" className="text-blue-500 hover:text-blue-700">
            Signup
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
