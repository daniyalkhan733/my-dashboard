// Updated InvoiceTable.jsx with working date filters

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Download } from "lucide-react";
import React, { useState } from "react";
import InvoiceFilterAccordion from "./common/InvoiceFilter";
import { useInvoiceData } from "../api/invoiceApi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../components/invoice/InvoicePDF";
import Loader from "./loader";

const columns = [
  { label: "#", field: "id" },
  { label: "From Date", field: "from_date", type: "date" },
  { label: "To Date", field: "to_date", type: "date" },
  { label: "Status", field: "status", type: "select", options: ["pending", "completed"] },
  { label: "Amount", field: "amount" },
  { label: "Discount", field: "discount" },
  { label: "Net Amount", field: "net_amount" },
  { label: "", field: "" },
  {
    label: "",
    render: (row) => (
      <button onClick={() => alert("View Invoice", row)} className="text-blue-600">
        View
      </button>
    ),
  },
];

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function calculateDiscountedAmount(amount, row) {
  const discountPercentage = Number(row.discount);
  const discountAmount = (amount * discountPercentage) / 100;
  return (amount - discountAmount).toFixed(2);
}

const InvoiceTable = () => {
  const [filters, setFilters] = useState({});
  const [isRowExpand, setIsRowExpand] = useState(false);
  const [generatedPDF, setGeneratedPDF] = useState(null);
  
  const { data: invoiceData, isLoading: isInvoiceLoading } = useInvoiceData(filters);
  
  const filteredData = invoiceData?.filter((item) =>
    Object.entries(filters).every(([key, value]) => {

      
      if (!value) return true;
  
      // Handle Amount From
      if (key === "amountFrom") {
        return item.donation.reduce((acc, curr) => acc + parseFloat(curr.donation_amount.replace(/,/g, "")), 0) >= parseFloat(value);
      }
  
      // Handle Amount To
      if (key === "amountTo") {
        return item.donation.reduce((acc, curr) => acc + parseFloat(curr.donation_amount.replace(/,/g, "")), 0) <= parseFloat(value);
      }
  
      // Handle From Date (From)
      if (key === "fromDateFrom") {
        return new Date(item.from_date) >= new Date(value);
      }
  
      // Handle From Date (To)
      if (key === "fromDateTo") {
        return new Date(item.from_date) <= new Date(value);
      }
  
      // Handle To Date (From)
      if (key === "toDateFrom") {
        return new Date(item.to_date) >= new Date(value);
      }
  
      // Handle To Date (To)
      if (key === "toDateTo") {
        return new Date(item.to_date) <= new Date(value);
      }
  
      // Default case (string match)
      return item[key]?.toString().toLowerCase().includes(value.toLowerCase());
    })
  );
  


  const handleGeneratePDF = (invoice) => {
    // setIsGeneratingPDF(invoice.invoice_id);
    setGeneratedPDF(invoice.invoice_id);
    // setIsGeneratingPDF(null);
  };


  if (isInvoiceLoading) return <Loader />;

  return (
    <div className="space-y-4">
      <InvoiceFilterAccordion
        columns={columns}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="max-w-full overflow-x-auto h-[80vh] overflow-y-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left border-collapse transition-all ">
          <thead className="bg-[#02343F] text-white uppercase text-xs">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-2 py-3 border-b-2">{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((row, rowIndex) => {
              const amount = row.donation.reduce((acc, curr) => acc + parseFloat(curr.donation_amount.replace(/,/g, "")), 0);
              return (
                <>
                  <tr
                    key={rowIndex}
                    onClick={() => setIsRowExpand(isRowExpand === row ? "" : row)}
                    className="border-b hover:bg-gray-50 transition-all duration-300"
                  >
                    <td className="px-2 py-4 font-medium text-gray-900">{row.invoice_id}</td>
                    <td className="px-2 py-4 font-medium">{formatDate(row.from_date)}</td>
                    <td className="px-2 py-4 font-medium">{formatDate(row.to_date)}</td>
                    <td className="px-2 py-4 font-medium">
                      <span className={`px-2 py-1 text-xs font-medium ${row.status === "pending" ? "text-yellow-600 bg-yellow-100" : "text-green-600 bg-green-100"} rounded-full`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-2 py-4 ">{amount.toFixed(2)}</td>
                    <td className="px-2 py-4 ">{row.discount}%</td>
                    <td className="px-2 py-4 ">{calculateDiscountedAmount(amount, row)}</td>
                    <td className="px-2 py-4 ">
                      {isRowExpand === row ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                    </td>
                    <td className="px-3 py-4 font-medium">
                      {generatedPDF === row.invoice_id ? (
                        <PDFDownloadLink
                          document={<InvoicePDF invoiceData={row} />}
                          fileName={`invoice-${row.invoice_id}.pdf`}
                        >
                          {({ loading }) => (
                            <button className="text-[#02343F] bg-[#02343F]/7 shadow-[#02343F]/7 shadow-lg p-3 rounded-lg text-xs flex justify-center items-center">
                              {loading ? "Loading..." : <span className=" flex gap-3"><Download className="w-5 h-5 animate-bounce" /> Download</span>}
                            </button>
                          )}
                        </PDFDownloadLink>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGeneratePDF(row);
                          }}
                          className="bg-[#02343F] text-gray-300 shadow-[#02343F]/3 shadow-lg p-3 rounded-lg text-xs"
                        >
                          Generate PDF
                        </button>
                      )}
                    </td>
                  </tr>

                  {isRowExpand === row && (
                    <tr>
                      <td colSpan={9}>
                        {row?.donation?.length > 0 ? (
                          <table className="w-full text-sm text-left border-t-2">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                              <tr>
                                <th className="px-4 py-2 font-medium text-gray-700">Donation Id</th>
                                <th className="px-4 py-2 font-medium text-gray-700">Donor Name</th>
                                <th className="px-4 py-2 font-medium text-gray-700">Program Name</th>
                                <th className="px-4 py-2 font-medium text-gray-700">Program Country</th>
                                <th className="px-4 py-2 font-medium text-gray-700">Total Donation Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {row.donation.map((invoice, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50 transition-all duration-300">
                                  <td className="px-4 py-2">{invoice.donation_id}</td>
                                  <td className="px-4 py-2">{invoice.donor_name}</td>
                                  <td className="px-4 py-2">{invoice.program_name}</td>
                                  <td className="px-4 py-2">{invoice.country_name}</td>
                                  <td className="px-4 py-2">{invoice.donation_amount}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p className="text-center text-white bg-red-300 py-4 px-6 rounded-md shadow-md font-semibold">
                            There is no donation in this invoice.
                          </p>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;
