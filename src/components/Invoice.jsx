// InvoiceTable.jsx
import React, { useState } from "react";
import { Filter } from "lucide-react";
import SingleInvoiceRow from "./invoice/SingleInvoiceRow";
import TablePagination from "./invoice/TablePagination";
import DateFilterMenu from "./invoice/DateFilterMenu";
import InvoiceFilterAccordion from "./common/InvoiceFilter";
import DataTable from "./common/DataTable";


const sampleData = [
  { id: 1, ticketId: "A123", date: "2025-01-21", status: "Paid", amountDue: 100, amountPaid: 100 },
  { id: 2, ticketId: "B456", date: "2025-01-22", status: "Pending", amountDue: 150, amountPaid: 0 },
  // more rows...
];

const columns = [
  {
    label: "",
    isCheckbox: true, // Column for checkboxes
  },
  {
    label: "#",
    render: (rowIndex) => rowIndex + 1, // Custom render for index
  },
  {
    label: "Ticket ID",
    field: "ticketId", // Maps to the field in the row
  },
  {
    label: "Date",
    field: "date",
  },
  {
    label: "Status",
    field: "status",
  },
  {
    label: "Amount Due",
    field: "amountDue",
  },
  {
    label: "Amount Paid",
    field: "amountPaid",
  },
  {
    label: "Action",
    render: (row) => <button onClick={() => alert("View Invoice", row)} className="text-blue-600">View</button>, // Custom render for action column
  },
];


const InvoiceTable = () => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleSelectRow = (row) => {
    console.log("Selected Row:", row);
  };




  const closeAllMenus = () => {
    setShowFilterMenu(false);
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (menuName) => {
    setActiveSubmenu(activeSubmenu === menuName ? null : menuName);
  };

  return (
    <div className="space-y-4">
      <InvoiceFilterAccordion/>

     <DataTable columns={columns} data={sampleData} onSelectRow={handleSelectRow} />

      <TablePagination />
    </div>
  );
};
export default InvoiceTable;