// InvoiceTable.jsx
import React, { useState } from 'react';
// import SingleInvoiceRow from './SingleInvoiceRow';
import { Filter } from 'lucide-react';

const InvoiceTable = () => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const sampleData = [
    {
      id: "1",
      invoiceNumber: "TCKT-001",
      date: "14/09/2024",
      status: "PAID",
      dueAmount: "£ 500",
      paidAmount: "£ 500"
    },
  ];

  const closeAllMenus = () => {
    setShowFilterMenu(false);
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (menuName) => {
    setActiveSubmenu(activeSubmenu === menuName ? null : menuName);
  };

  return (
    <div className="space-y-4">
      <div className="relative flex flex-row pt-4">
        <button
          onClick={() => setShowFilterMenu(!showFilterMenu)}
          className="mb-4 flex items-center bg-black text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-800"
        >
          <Filter className="w-5 h-5 mr-2 " />
          <span>Filter</span>
        </button>

        {showFilterMenu && (
          <div className="absolute top-12 left-0 w-48 bg-white shadow-lg rounded-lg z-10">
            {/* Filter Menu Content */}
            <ul>
              <li className="border-b relative">
                <button 
                  onClick={() => toggleSubmenu('date')}
                  className="flex justify-between w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Filter by Date
                  <span>▶</span>
                </button>
                {activeSubmenu === 'date' && (
                  <div className="absolute left-full top-0 mt-0 w-96 bg-white shadow-lg rounded-lg z-20">
                    <DateFilterMenu />
                  </div>
                )}
              </li>
              {/* Add other filter options similarly */}
            </ul>
          </div>
        )}
      </div>

      <div className="max-w-full overflow-x-auto h-96 overflow-y-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-4">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
              </th>
              <th className="p-4">#</th>
              <th className="px-6 py-3">Ticket ID</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Amount Due</th>
              <th className="px-6 py-3">Amount Paid</th>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map(row => (
              <SingleInvoiceRow key={row.id} {...row} />
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination />
    </div>
  );
};

// SingleInvoiceRow.jsx
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

// DateFilterMenu.jsx
const DateFilterMenu = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-96">
      <div className="flex justify-between mb-4">
        <div className="w-1/2 pr-2">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          Reset
        </button>
        <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
          Apply
        </button>
      </div>
    </div>
  );
};

// TablePagination.jsx
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

export default InvoiceTable;