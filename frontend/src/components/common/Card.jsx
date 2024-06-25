import React, { useState } from 'react';

const Card = ({ data }) => {
  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    setCheck((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-4 m-9 items-center justify-center">
      <div className="border border-gray-300 rounded-lg shadow-md p-6 w-64">
        <h1 className="text-xl font-bold mb-4">{data.disease}</h1>
        {/* <p className="text-gray-700">{data.Description}</p> */}
        {check && (
          <p className="text-gray-700 mt-4 leading-normal">{data.readMore}</p>
        )}
        <button
          onClick={handleCheck}
          className="mt-4 px-4 py-2 rounded-md text-white bg-black hover:bg-green-400 hover:text-black focus:outline-none"
        >
          {check ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
};

export default Card;
