import React from 'react';
import { doctorData } from '../../assets/constants';
import Card from '../common/Card';

const Section2 = () => {
  return (
    <div className='container mx-auto py-12'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center'>Our Facilities</h2>
        <div className='flex flex-wrap'>
          {doctorData.map((data, index) => (
            <Card key={index} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section2;
