import { Link } from "react-router-dom";

const Breadcrumb = ({ title }) => {
  return (
    <nav className="flex flex-wrap text-gray-500 space-x-2 md:pt-0 pt-5">
      <Link to="/" className="hover:underline">
        Home
      </Link>
      <span>/</span>
      <p className=" text-[#02343F] font-medium">{title}</p>
    </nav>
  );
};

export default Breadcrumb;
