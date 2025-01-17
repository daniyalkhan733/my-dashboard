const CardTwo = ({ title, value, description }) => {
    return(
    <div className="p-4 bg-white rounded-lg shadow-md h-auto grid content-around">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-3xl mb-4 font-semibold">{value || "No value found"}</p>
      <p className="text-[14px] font-semibold text-gray-600">{description}</p>
    </div>
  )};
export default CardTwo;