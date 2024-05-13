import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { images } from '../../assets/constants';
import { Link } from 'react-router-dom';

const MiddleSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNextImage = () => {
        setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handlePrevImage = () => {
        setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         handleNextImage();
    //     }, 5000);

    //     return () => clearInterval(timer);
    // }, []);

    return (
        <div className="relative  w-full pt-4 pb-4 bg-gray-300 h-[80vh]">
            <h1 className="text-3xl font-bold text-center mb-8">Hospital Extension</h1>
            <div className="flex items-center justify-center space-x-4">
                <button
                    className="text-gray-800 hover:text-gray-900 font-bold py-2 px-4 rounded-full bg-white shadow"
                    onClick={handlePrevImage}
                >
                    <FaChevronLeft />
                </button>
                {images.map((url, index) => (
                    <div key={index} className={`text-center ${index === activeIndex ? 'block' : 'hidden'}`}>
                        <img
                            src={url.url}
                            alt={`Doctor ${index}`}
                            className="w-[300px] h-[200px] rounded-lg shadow-lg"
                        />
                        <div className="mt-4">
                            <p className="text-lg font-semibold">{url.name}</p>
                            <Link to="/appointment">
                                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                    {url.Book}
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
                <button
                    className="text-gray-800 hover:text-gray-900 font-bold py-2 px-4 rounded-full bg-white shadow"
                    onClick={handleNextImage}
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default MiddleSection;
