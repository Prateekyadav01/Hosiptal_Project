import React from 'react';
import { useParams } from 'react-router-dom';
import { doctorData } from '../../assets/constants';

const Details = () => {
  const { id } = useParams();
  const doctor = doctorData.find((doc) => doc.id === parseInt(id));

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  const handleBack = () => {
    window.history.back();
  };
  const handleAppoint = () => {
    window.location.href = '/appointment';
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='container mx-auto py-12'>
        <div className='max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
          <h2 className='text-3xl font-bold text-gray-800 mb-6'>{doctor.disease}</h2>
          <p className='text-gray-700 leading-relaxed'>{doctor.Description}</p>
          {/* Add more details as needed */}
          <div className='flex justify-between mt-6'>
            <button onClick={handleBack} className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none'>
              Back
            </button>
            <button onClick={handleAppoint} className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none'>
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
