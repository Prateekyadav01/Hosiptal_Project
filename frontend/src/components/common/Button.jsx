import React from 'react'

const Button = ({ data, function: handleChangeDoctor, function1: handleChangePatient }) => {
  return (
    <div className='mt-10'>
        <button
          onClick={ data ? handleChangeDoctor : handleChangePatient }
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            data ? 'bg-blue-700' : ''
          }`}
        >
          {
            data ? "Are you a Doctor ? " :"Are you a Patient ?"
          }
        </button>
    </div>
  )
}

export default Button
