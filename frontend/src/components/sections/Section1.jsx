import React from 'react';

const Section1 = () => {
    return (
        <div className="container mx-auto mt-2 p-2 flex flex-col  justify-center items-center h-[50vh]">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 shadow-md p-6 rounded-md">What We Do</h3>
            <div className="max-w-4xl">
                <p className="text-gray-700 leading-7 border border-solid p-8 rounded-md shadow-md ">
                    We bring healthcare to your convenience, offering a comprehensive range of on-demand medical services tailored to your needs. Our platform allows you to connect with experienced online doctors who provide expert medical advice, issue online prescriptions, and offer quick refills whenever you require them.
                </p>
            </div>
        </div>
    );
};

export default Section1;
