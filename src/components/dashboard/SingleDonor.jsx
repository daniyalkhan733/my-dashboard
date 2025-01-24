const SingleDonor = ({ item }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div className="flex justify-between items-center py-3 px-2">
        <div className="flex-grow pr-4">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {`${item.first_name} ${item.last_name}`.trim()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Last Donated: {item.last_donated_date}
          </p>
        </div>
        <div className="bg-gray-100 px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-gray-900">
            £{item.total_donation_amount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
export default SingleDonor;