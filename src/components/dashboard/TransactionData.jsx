import React from 'react';
import { Link } from 'react-router-dom';
import SingleTransactionRow from "./SingleTransactionRow";



const TransactionData = ({ transactions }) => {
  return (
    <section className="w-full py-2 ">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-xl md:text-[28px] font-bold text-gray-800">
          Last Transaction
        </h2>
        <Link to="/report/donation" className="mt-2 md:mt-0">
          <button className="px-4 py-2 bg-[#02343F] text-[12px] md:text-[16px] text-white rounded-lg hover:bg-[#034c5c]">
            View Donation Report
          </button>
        </Link>
      </div>
      
      <div className="w-full overflow-x-auto" >
        <div className="min-w-[600px] rounded-md">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 bg-[#02343F] text-white rounded-t-md p-3 text-sm md:text-lg sticky top-0">
            <div className="text-left">Category</div>
            <div className="text-center">Donation Date</div>
            <div className="text-center">Program Name</div>
            <div className="text-right">Donation Amount</div>
          </div>
          
          {/* Transactions */}
          <div className="bg-white overflow-x-auto h-80" style={{
          maxHeight: '70vh',
          scrollbarWidth: 'thin',
          scrollbarColor: '#004D40 white'
        }}>
            {transactions.slice(0,10).map((transaction, index) => (
              <SingleTransactionRow 
                key={transaction.id || index} 
                {...transaction} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionData;