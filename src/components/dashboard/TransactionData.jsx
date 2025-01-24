import SingleTransactionRow from "./SingleTransactionRow";
const TransactionData = ({ transactions }) => {
  return (
    <section className="m-[-20px] p-2 pt-10">
      <div className="flex items-center justify-between mb-1 pb-8">
        <h2 className="md:text-[28px] text-xl font-bold text-gray-800 align-middle">
          Last Transaction
        </h2>
        <a href="/report/donation">
          <button className="px-4 py-2 bg-[#02343F] text-[12px] md:text-[16px] text-white rounded-lg hover:bg-[#034c5c]">
            View Donation Report
          </button>
        </a>
      </div>

      <thead className=" sticky top-0 bg-[#02343F] text-white  rounded-t-md grid grid-cols-4 gap-4 text-center w-full pr-4 text-sm md:text-lg">
        <th className="p-4 font-semibold flex justify-start">Category</th>
        <th className="p-4 font-semibold">Donation Date</th>
        <th className="p-4 font-semibold">Program Name</th>
        <th className="p-4 font-semibold flex justify-end">Donation Amount</th>
      </thead>
      <div className="bg-white p-5 rounded-xl">
        <div
          className=" overflow-auto overflow-x-scroll rounded-md "
          style={{
            maxHeight: "70vh",
            scrollbarWidth: "thin",
            scrollbarColor: "#004D40 white",
          }}
        >
          {transactions.slice(0,10).map((transaction, index) => (
            <SingleTransactionRow key={index} {...transaction} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransactionData;
