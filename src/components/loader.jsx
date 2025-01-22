

const Loader = () => {

    return (
        <div className="flex justify-center items-center my-auto align-middle h-screen">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-gray-300 border-t-teal-900 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img className=" rounded-full bg-gray-700" src="/assets/images/logo.png" alt="" height="56px" width="56px" />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Loader;