const Breadcrumb = ({ title }) => {
  return (
    <nav className="flex flex-wrap text-gray-500 space-x-2 md:pt-0 pt-5">
      <a href="/" className="hover:underline">
        Home
      </a>
      <span>/</span>
      <p className=" text-[#02343F] font-medium">{title}</p>
    </nav>
  );
};

export default Breadcrumb;
