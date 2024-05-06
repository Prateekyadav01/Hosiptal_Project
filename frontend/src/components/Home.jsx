import React from 'react';
import { Link } from 'react-router-dom';

import MiddleSection from './sections/MiddleSection';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">

      
      
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 ">
        <MiddleSection />
      </div>

   
    </div>
  );
};

export default Home;
