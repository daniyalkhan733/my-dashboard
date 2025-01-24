import React from 'react';
import SingleDonor from './SingleDonor';
// DonorTable Component
const DonorTable = ({ donors }) => {
  return (
    <div className="bg-white h-[35rem]  rounded-lg shadow-lg w-full md:w-1/4 mt-2">
      <h2 className="text-xl font-bold text-white bg-primary py-2  rounded-t-md text-center">
        Top Donors
      </h2>
      <div className="flex flex-col">
        <div 
          className="h-[30rem] overflow-y-auto custom-scrollbar px-2"
          style={{
            maxHeight: '70vh',
            scrollbarWidth: 'thin',
            scrollbarColor: '#004D40 white'
          }}>
          {donors?.length > 0 ? (
            donors.map((donor, index) => (
              <SingleDonor key={donor.id || index} item={donor} />
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              No donors found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// SingleDonor Component


export default DonorTable;