import React from 'react'

const Button = ({ data, function: handleChangeDoctor, function1: handleChangePatient }) => {
  console.log(data);
  return (
    <div className='flex justify-center mt-52'>
        <button
          onClick={ data===true ? handleChangeDoctor : handleChangePatient }
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            data===true ? 'bg-blue-700' : ''
          }`}
        >
          {
            data===true ? "Are you a Doctor ? " :"Are you a Patient?"
          }
        </button>
    </div>
  )
}

export default Button
