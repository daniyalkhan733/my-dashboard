const SingleTransactionRow = ({ category, date, programName, amount }) => {
    return (
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
  )};
  export default SingleTransactionRow;