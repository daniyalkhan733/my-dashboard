import SingleTransactionRow from "./SingleTransactionRow";
const TransactionData = ({ transactions }) => {

  console.log(transactions,);
  
  
  return (
    <section className="m-[-20px] p-2 pt-10">
      <div className="flex items-center justify-between mb-1 pb-8">
        <h2 className="md:text-[28px] text-xl font-bold text-gray-800 align-middle">
          Last Transaction
        </h2>
      <a href="/report/donation">
        <button className="px-4 py-2 bg-[#02343F] text-[12px] md:text-[16px] text-white rounded-lg hover:bg-[#034c5c]">
          View Donation Report
        </button></a>
      </div>
      <div className=" gap-4 text-center w-96 md:w-full p-3 rounded-t-md bg-primary justify-between flex">
        <div className="flex items-center rounded text-[18px] align-middle text-white font-semibold">
         Category
        </div>
        <div className="pl-12 flex items-center rounded text-[18px] align-middle text-white font-semibold">
         Donation Date
        </div>
        <div className="flex items-center rounded text-[18px] align-middle text-white font-semibold">
         Program Name
        </div>
        <div className="flex justify-end items-center rounded text-[18px] text-white font-semibold">
          Donation Amount
        </div>
      </div>
      <thead className="sticky top-0 bg-[#02343F] text-white">
              <tr>
                {["Category"].map(({ key }) => (
                  <th key={key} className="p-4 font-semibold">
                    <span>{key}</span>
                  </th>
                ))}
              </tr>
            </thead>
      <div className="bg-white p-5 rounded-xl">
        
        <div className=" overflow-auto overflow-x-scroll rounded-md "  style={{
             maxHeight: '70vh',
             scrollbarWidth: 'thin',
             scrollbarColor: '#004D40 white'
           }}>
          
          {transactions.map((transaction, index) => (
            <SingleTransactionRow key={index} {...transaction} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransactionData;