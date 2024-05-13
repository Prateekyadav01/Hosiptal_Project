import React, { useState } from 'react';

const Card = ({ data }) => {
  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    setCheck((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-1/2 md:w-1/3 lg:w-1/4 p-4 items-center justify-center bg-gray-400 rounded-md">
      <div className="border border-gray-300 rounded-lg shadow-md p-6 bg-white w-full">
        <h1 className="text-xl font-bold mb-4">{data.disease}</h1>
        <p className="text-gray-700">{data.Description}</p>
        {check && <p className="text-gray-700 mt-4">{data.readMore}</p>}
        <button
          onClick={handleCheck}
          className="mt-4 px-4 py-2 rounded-md text-white bg-black hover:bg-blue-600 focus:outline-none"
        >
          {check ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
};

export default Card;
