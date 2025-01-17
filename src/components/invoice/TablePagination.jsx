const TablePagination = () => {
    return (
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-700">1-10 of 97</span>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Rows per page:</span>
          <select className="text-sm border-gray-300 rounded-md">
            <option>10</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
            &lt;
          </button>
          <span className="text-sm text-gray-700">1/10</span>
          <button className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
            &gt;
          </button>
        </div>
      </div>
    );
  };
  export default TablePagination;