import React, { useState } from 'react';
import ICU from '../../assets/assets/Images/ICU.avif'

const departments = [
  { id: 1, name: 'Cardiology' },
  { id: 2, name: 'Neurology' },
  { id: 3, name: 'Orthopedics' }
];

function Appoint() {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    name: '',
    date: '',
    time: ''
  });
//   console.log(selectedDepartment.name);
  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
    // console.log(selectedDepartment.name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails({ ...appointmentDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDepartment) {
      alert('Please select a department.');
      return;
    }
    alert(`Appointment booked for ${appointmentDetails.name} in ${selectedDepartment.name} on ${appointmentDetails.date} at ${appointmentDetails.time}.`);
  };

  return (
    <div className="bg-black h-screen flex flex-col ">
      <h1 className="text-3xl font-bold flex items-center text-white justify-center mb-6">Medical Appointment Page</h1>
      <div className='flex justify-evenly'>
        <img src={ICU}></img>
        <div className='flex flex-col'>
        <div className="departments flex justify-center space-x-4 mb-6">
        {departments.map((department) => (
          <button 
            key={department.id} 
            onClick={() => handleDepartmentClick(department)} 
            className={`px-4 py-2 rounded ${
              selectedDepartment === department ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
          >
            {department.name}
          </button>
        ))}
      </div>
      {selectedDepartment && (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Book an Appointment in {selectedDepartment.name}</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input 
              type="text" 
              name="name" 
              value={appointmentDetails.name} 
              onChange={handleInputChange} 
              required 
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date:</label>
            <input 
              type="date" 
              name="date" 
              value={appointmentDetails.date} 
              onChange={handleInputChange} 
              required 
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Time:</label>
            <input 
              type="time" 
              name="time" 
              value={appointmentDetails.time} 
              onChange={handleInputChange} 
              required 
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded">Book Appointment</button>
        </form>
      )}
        </div>
      </div>
    </div>
  );
}

export default Appoint;
