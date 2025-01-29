const DataTable = ({ columns, data, onSelectRow }) => {
    return (
      <div className="max-w-full overflow-x-auto h-96 overflow-y-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left">
          {/* Table Head */}
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-6 py-3">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
  
          {/* Table Body */}
          <tbody>
            {data.map((row, rowIndex) => {
                
                return(
              <tr key={rowIndex} className="border-b hover:bg-gray-50">
                {columns.map((column, colIndex) => {
                  // Handle checkbox column
                  if (column.isCheckbox) {
                    return (
                      <td key={colIndex} className="p-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                          onChange={() => onSelectRow(row)}
                        />
                      </td>
                    );
                  }
                  
                  // Default rendering
                  return (
                    <td key={colIndex} className="px-6 py-3">
                      {column.render ? column.render(rowIndex) : row[column.field]}
                    </td>
                  );
                })}
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    );
  };
  

  export default DataTable