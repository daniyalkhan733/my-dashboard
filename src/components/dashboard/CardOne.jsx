const CardOne = ({ title, value, description, src, textColor }) => {
    return (
    <div
      className={`p-6 rounded-lg shadow-2xl h-52 grid content-around bg-center bg-cover text-${textColor}`}
      style={{ backgroundImage: src }}
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-3xl mb-4 font-bold">{value}</p>
      <p className=" font-semibold">{description}</p>
    </div>
  )};

export default CardOne;
