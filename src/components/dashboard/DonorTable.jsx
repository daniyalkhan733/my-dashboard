import SingleDonor from "./SingleDonor";
const DonorTable = () => {
    return (
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
  )};
export default DonorTable;