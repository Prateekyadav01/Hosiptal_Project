import React from 'react';

const ButtonAll = ({ onClick, children }) => {


    return (
        <button onClick={onClick} className="flex items-center w-[40%] h-[10vh] rounded-md justify-center mt-3  bg-purple-600 hover:bg-purple-700 text-white ">

            {children}
        </button>
    );
};

export default ButtonAll;
