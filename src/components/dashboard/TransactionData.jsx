import SingleTransactionRow from "./SingleTransactionRow";
const TransactionData = ({ transactions }) => {

  return (
    <section className="m-[-20px] p-2 pt-10">
      <div className="flex items-center justify-between mb-1 pb-8">
        <h2 className="md:text-[28px] text-xl font-bold text-gray-800 align-middle">
          Last Transaction
        </h2>
        <button className="px-4 py-2 bg-[#02343F] text-[12px] md:text-[16px] text-white rounded-lg hover:bg-[#034c5c]">
          View More
        </button>
      </div>
      <div className="bg-white p-5 rounded-xl">
        <div className="h-80 overflow-auto overflow-x-scroll  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300">
          {transactions.map((transaction, index) => (
            <SingleTransactionRow key={index} {...transaction} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransactionData;