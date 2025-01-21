const SingleDonor = ({ item }) => {

  return (
    <div className="flex justify-between items-center py-2">
      <div>
        <p className="text-[14px] font-semibold text-[#0F172A] truncate max-w-[100px]">
          {item.first_name + " " + item.last_name}
        </p>

        <p className="text-[12px] text-[#64748B]">{new Date(item.updated_at).toDateString()}</p>
      </div>
      <div className="bg-[#F1F5F9] px-4 py-1 rounded-full">
        <span className="text-[14px] font-semibold text-[#0F172A]">£1000</span>
      </div>
    </div>
  )
};
export default SingleDonor;