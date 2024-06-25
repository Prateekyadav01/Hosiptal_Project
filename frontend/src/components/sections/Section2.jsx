import React from 'react';
import { doctorData } from '../../assets/constants';
import Card from '../common/Card';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Section2 = () => {
  const selector = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleParams = (id) => {
    navigate(`/section/${id}`);
  };

  return (
    <div className='container mx-auto py-12'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center'>Our Facilities</h2>
        <div className='flex flex-wrap w-full border-2'>
          {doctorData.map((data, index) => (
            selector ? (
              <div key={index} onClick={() => handleParams(data.id)}>
                <Card data={data} />
              </div>
            ) : (
              <Card key={index} data={data} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section2;
