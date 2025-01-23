const SingleDonor = ({ item }) => {

  return (
    <>
    <div className="flex justify-between items-center py-2">
      <div>
        <p className="text-[14px] font-semibold text-[#0F172A] truncate max-w-[100px]">
          {item.first_name + " " + item.last_name}
        </p>

        <p className="text-[12px] text-[#64748B]">{item.last_donated_date}</p>
      </div>
      <div className="bg-[#F1F5F9] px-4 py-1 rounded-full">
        <span className="text-[14px] font-semibold text-[#0F172A]">£ {item.total_donation_amount}</span>
      </div>
    </div>
          <hr className="my-1 border-[#D2D2D2]" />
          </>
  )
};
export default SingleDonor;