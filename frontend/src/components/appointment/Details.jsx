import React from 'react';
import { useParams } from 'react-router-dom';
import { doctorData } from '../../assets/constants';

const Details = () => {
  const { id } = useParams();
  const doctor = doctorData.find((doc) => doc.id === parseInt(id));

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  return (
    <div className='container mx-auto py-12'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-800 mb-6'>{doctor.disease}</h2>
        <p>{doctor.Description}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default Details;
