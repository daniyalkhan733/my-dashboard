import React from "react";

const CardOne = ({ title, value, description, src, textColor }) => (
  <div
    className={`p-6 rounded-lg shadow-2xl h-52 grid content-around bg-center bg-cover text-${textColor}`}
    style={{ backgroundImage: src }}
  >
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <p className="text-3xl mb-4 font-bold">{value}</p>
    <p className="text-[#64748B] font-semibold">{description}</p>
  </div>
);

const CardTwo = ({ title, value, description }) => (
  <div className="p-4 bg-white rounded-lg shadow-md h-auto grid content-around">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <p className="text-3xl mb-4 font-semibold">{value || "No value found"}</p>
    <p className="text-[14px] font-semibold text-gray-600">{description}</p>
  </div>
);

const SingleDonor = () => (
  <div className="flex justify-between items-center py-2">
    <div>
      <p className="text-[14px] font-semibold text-[#0F172A]">Floyd Miles</p>
      <p className="text-[12px] text-[#64748B]">Today, 13:21</p>
    </div>
    <div className="bg-[#F1F5F9] px-4 py-1 rounded-full">
      <span className="text-[14px] font-semibold text-[#0F172A]">£1000</span>
    </div>
  </div>
);

const DonorTable = () => (
  <div
    className="bg-white md:py-6 md:pl-6 p-2 rounded-lg shadow-lg w-full h-[37rem] md:w-1/4"
    style={{ marginTop: "8px" }}
  >
    <h2 className="text-xl font-bold text-gray-800 mb-4">Top Donors</h2>
    <div className="flex flex-col space-y-4">
      <p className="text-[12px] text-[#64748B] font-semibold">History</p>
      <div className="h-[30rem] overflow-auto overflow-x-scroll pr-4">
        {[...Array(11)].map((_, index) => (
          <SingleDonor key={index} />
        ))}
      </div>
    </div>
  </div>
);

const SingleTransactionRow = ({ category, date, programName, amount }) => (
  <>
    <div className="grid grid-cols-4 gap-4 text-center w-96 md:w-full pr-4">
      <div className="flex items-center pb-2 rounded text-[18px] align-middle text-[#1E293B] font-semibold">
        {category}
      </div>
      <div className="flex items-center justify-center rounded text-[12px] align-middle text-[#64748B]">
        {date}
      </div>
      <div className="flex items-center justify-center rounded text-[12px] align-middle text-[#64748B]">
        {programName}
      </div>
      <div className="flex justify-end items-center pb-2 rounded text-[18px] text-[#1E293B] font-semibold">
        {`£ ${amount}`}
      </div>
    </div>
    <hr className="mt-1 mb-8 border-[#D2D2D2]" />
  </>
);

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

const DashboardDetails = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <CardOne
          title="Daily Donation"
          value="£ 100"
          description="+30% From Last Month"
          src="url('/assets/images/card1-one.png')"
          textColor="white"
        />
        <CardOne
          title="Weekly Donation"
          value="£ 1000"
          description="+30% From Last Month"
          src="url('/assets/images/card1-two.png')"
          textColor="black"
        />
        <CardOne
          title="Monthly Donation"
          value="£ 10,000"
          description="+30% From Last Month"
          src="url('/assets/images/card1-three.png')"
          textColor="white"
        />
      </div>

      <div className="flex flex-col md:flex-row py-6 space-y-6 md:space-y-0 md:space-x-6">
        <div className="p-4 md:p-6 rounded-lg w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 m-[-15px]">
            <CardTwo
              title="Total Donation"
              value="£ 1,50,000"
              description="+30% From Last Month"
            />
            <CardTwo
              title="Total Donors"
              value="600"
              description="+30 New Donors"
            />
            <CardTwo
              title="Active Campaign"
              value="6"
              description="+3 New Campaign"
            />
          </div>
          <TransactionData />
        </div>

        <DonorTable />
      </div>
    </div>
  );
};

export default DashboardDetails;
