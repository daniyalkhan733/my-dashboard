import React from 'react';

const NoDonationsFound = ({setFilters}) => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto p-12 bg-white rounded-lg shadow-md">
      <div className=" rounded-full p-6 mb-6">
        <img src="/assets/images/logo.png" alt=""  className='border-black border rounded-full w-40 h-40'/>
      </div>
      <h2 className="text-2xl font-bold text-[#02343F] mb-4 text-center">
        No Donations Found
      </h2>
      <p className="text-gray-600 text-center max-w-md mb-6">
        It seems there are no donations matching your current filters. 
        Try adjusting your search criteria or check back later.
      </p>
      <button 
        onClick={() =>setFilters({})} 
        className="px-6 py-2 bg-[#02343F] text-white rounded-md hover:bg-[#02343F]/90 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default NoDonationsFound;