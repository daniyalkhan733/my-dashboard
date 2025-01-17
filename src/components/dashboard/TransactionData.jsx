import SingleTransactionRow from "./SingleTransactionRow";
const TransactionData = () => {
    const transactions = [
      {
        category: "Sadaqah",
        date: "2022-01-01",
        programName: "Education Fund",
        amount: "500",
      },
    ];
  
    return (
      <section className="m-[-20px] p-2 pt-10">
        <div className="flex items-center justify-between mb-4 pb-8">
          <h2 className="md:text-[28px] text-xl font-bold text-gray-800 align-middle">
            Last Transaction
          </h2>
          <button className="px-4 py-2 bg-[#02343F] text-[12px] md:text-[16px] text-white rounded-lg hover:bg-[#034c5c]">
            View More
          </button>
        </div>
        <div className="h-80 overflow-auto overflow-x-scroll shadow-md md:shadow-none">
          {transactions.map((transaction, index) => (
            <SingleTransactionRow key={index} {...transaction} />
          ))}
        </div>
      </section>
    );
  };

  export default TransactionData;