// InvoiceTable.jsx
import React, { useState } from "react";
import { Filter } from "lucide-react";
import SingleInvoiceRow from "./invoice/SingleInvoiceRow";
import TablePagination from "./invoice/TablePagination";
import DateFilterMenu from "./invoice/DateFilterMenu";

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
      paidAmount: "£ 500",
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
                  onClick={() => toggleSubmenu("date")}
                  className="flex justify-between w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Filter by Date
                  <span>▶</span>
                </button>
                {activeSubmenu === "date" && (
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
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
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
            {sampleData.map((row) => (
              <SingleInvoiceRow key={row.id} {...row} />
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination />
    </div>
  );
};

export default InvoiceTable;
