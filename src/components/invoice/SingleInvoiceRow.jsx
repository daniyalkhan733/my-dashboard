const SingleInvoiceRow = ({ id, invoiceNumber, date, status, dueAmount, paidAmount }) => {
    const getStatusClassName = (status) => {
      const baseClasses = "px-3 py-1 text-sm font-medium rounded-full";
      const statusClasses = {
        "PAID": "text-black bg-green-100",
        "UNPAID": "bg-red-100 text-red-500",
        "PARTIALLY PAID": "bg-blue-100 text-blue-500",
        "default": "bg-yellow-100 text-yellow-500"
      };
      return `${baseClasses} ${statusClasses[status] || statusClasses.default}`;
    };
  
    return (
      <tr className="bg-white border-b hover:bg-gray-50">
        <td className="p-4">
          <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
        </td>
        <td className="p-4 text-center">{id}</td>
        <td className="px-6 py-4 font-medium text-gray-900">{invoiceNumber}</td>
        <td className="px-6 py-4 font-medium">{date}</td>
        <td className="px-6 py-4">
          <span className={getStatusClassName(status)}>
            {status}
          </span>
        </td>
        <td className="px-10 py-4">{dueAmount}</td>
        <td className="px-10 py-4">{paidAmount}</td>
        <td className="px-6 py-4 ">
          <button className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900">
            Generate Invoice
          </button>
        </td>
        {/* <td className="px-6 py-4">
          <button className="px-4 py-2 text-black bg-green-200 rounded-md hover:bg-green-300">
            Download
          </button>
        </td> */}
      </tr>
    );
  };

  export default SingleInvoiceRow;