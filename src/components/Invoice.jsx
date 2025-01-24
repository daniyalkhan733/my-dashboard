// InvoiceTable.jsx
import React, { useState } from "react";
// import { Filter } from "lucide-react";

// import InvoiceFilterAccordion from "./common/InvoiceFilter";
// import DataTable from "./common/DataTable";

// const sampleData = [
//   { id: 1, ticketId: "A123", date: "2025-01-21", status: "Paid", amountDue: 100, amountPaid: 100 },
//   { id: 2, ticketId: "B456", date: "2025-01-22", status: "Pending", amountDue: 150, amountPaid: 0 },
//   // more rows...
// ];

// const columns = [
//   {
//     label: "",
//     isCheckbox: true, // Column for checkboxes
//   },
//   {
//     label: "#",
//     render: (rowIndex) => rowIndex + 1, // Custom render for index
//   },
//   {
//     label: "Ticket ID",
//     field: "ticketId", // Maps to the field in the row
//   },
//   {
//     label: "Date",
//     field: "date",
//   },
//   {
//     label: "Status",
//     field: "status",
//   },
//   {
//     label: "Amount Due",
//     field: "amountDue",
//   },
//   {
//     label: "Amount Paid",
//     field: "amountPaid",
//   },
//   {
//     label: "Action",
//     render: (row) => <button onClick={() => alert("View Invoice", row)} className="text-blue-600">View</button>, // Custom render for action column
//   },
// ];

const InvoiceTable = () => {
  // const [showFilterMenu, setShowFilterMenu] = useState(false);
  // const [activeSubmenu, setActiveSubmenu] = useState(null);

  // const handleSelectRow = (row) => {
  //   console.log("Selected Row:", row);
  // };

  // const closeAllMenus = () => {
  //   setShowFilterMenu(false);
  //   setActiveSubmenu(null);
  // };

  // const toggleSubmenu = (menuName) => {
  //   setActiveSubmenu(activeSubmenu === menuName ? null : menuName);
  // };

  return (
    // <div className="space-y-4">
    //   <InvoiceFilterAccordion/>

    //  <DataTable columns={columns} data={sampleData} onSelectRow={handleSelectRow} />

    // </div>
    <div className="flex flex-col items-center justify-center mx-auto p-12 bg-white rounded-lg shadow-md">
      <div className=" rounded-full p-6 mb-6">
        <img
          src="/assets/images/logo.png"
          alt=""
          className="border-black border rounded-full w-40 h-40"
        />
      </div>
      <h2 className="text-2xl font-bold text-[#02343F] mb-4 text-center">
        Coming Soon...{" "}
      </h2>
      {/* <p className="text-gray-600 text-center max-w-md mb-6">
      It seems there are no invoices matching you.
    </p> */}
    </div>
  );
};
export default InvoiceTable;
