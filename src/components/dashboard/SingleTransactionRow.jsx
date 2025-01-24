const SingleTransactionRow = ({ category, donation_date, program_name, donation_amount }) => {
  return (
    <div className="grid grid-cols-4 gap-4 text-center w-full px-4 py-2">
      <div className="flex items-center justify-start text-[16px] text-[#1E293B] font-semibold truncate">
        {category}
      </div>
      <div className="flex items-center justify-center text-[14px] text-[#64748B] truncate">
        {donation_date}
      </div>
      <div className="flex items-center justify-center text-[14px] text-[#64748B] truncate">
        {program_name}
      </div>
      <div className="flex justify-end items-center text-[16px] text-[#1E293B] font-semibold">
        {`£ ${donation_amount}`}
      </div>
      <hr className="col-span-4 my-2 border-[#D2D2D2]" />
    </div>
  );
};
export default SingleTransactionRow;