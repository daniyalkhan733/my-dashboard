import SingleDonor from "./SingleDonor";
const DonorTable = ({donors}) => {
    return (
    <div
      className="bg-white md:py-6 md:pl-6 p-2 rounded-lg shadow-lg w-full h-[35rem] md:w-1/4"
      style={{ marginTop: "8px" }}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">Top Donors</h2>
      <div className="flex flex-col space-y-4">
        <div className="h-[30rem] overflow-auto overflow-x-scroll pr-4 rounded-md"
         style={{
          maxHeight: '70vh',
          scrollbarWidth: 'thin',
          scrollbarColor: '#004D40 white'
        }}>
          {donors?.map((item, index) => (
            <SingleDonor item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  )};
export default DonorTable;