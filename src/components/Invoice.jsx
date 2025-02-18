import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Download } from "lucide-react";
// InvoiceTable.jsx
import React, { useState } from "react";
import InvoiceFilterAccordion from "./common/InvoiceFilter";
import { useInvoiceData } from "../api/invoiceApi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../components/invoice/InvoicePDF";
import Loader from "./loader";

const columns = [
  {
    label: "#",
    field: "id", // Custom render for index
  },
  {
    label: "From Date",
    field: "from_date",
  },
  {
    label: "To Date",
    field: "to_date",
  },
  {
    label: "Status",
    field: "status",
  },
  {
    label: "Amount",
    field: "amount",
  },
  {
    label: "Discount",
    field: "discount",
  },
  {
    label: "Net Amount",
    field: "net_amount",
  },
  {
    label: "",
    field: "",
  },
  {
    label: "",
    render: (row) => (
      <button
        onClick={() => alert("View Invoice", row)}
        className="text-blue-600"
      >
        View
      </button>
    ), // Custom render for action column
  },
];

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-indexed in JavaScript
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function calculateDiscountedAmount(amount, row) {
  const discountPercentage = Number(row.discount);

  const discountAmount = (amount * discountPercentage) / 100;

  const finalAmount = amount - discountAmount;

  const formattedAmount = finalAmount.toFixed(2);

  return formattedAmount;
}

const InvoiceTable = () => {
  const [isRowExpand, setIsRowExpand] = useState(false);
  const [generatedPDF, setGeneratedPDF] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(null);

  const handleGeneratePDF = (invoice) => {
    setIsGeneratingPDF(invoice.invoice_id); // Start PDF generation
    // setTimeout(() => {
    setGeneratedPDF(invoice.invoice_id); // Mark PDF as generated
    setIsGeneratingPDF(null); // Reset after PDF is generated
    // }, 2000); // Simulating a 2-second delay for generating PDF
  };

  const {
    data: invoiceData,
    isLoading: isInvoiceLoading,
    isError: isInvoiceError,
    error: invoiceError,
  } = useInvoiceData();

  if (isInvoiceLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      {/* <InvoiceFilterAccordion /> */}

      <div className="max-w-full overflow-x-auto h-[80vh] overflow-y-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left border-collapse transition-all ">
          {/* Table Head */}
          <thead className="bg-[#02343F] text-white uppercase text-xs">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-6 py-3 border-b-2">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {invoiceData.reverse().map((row, rowIndex) => {
              // const amount = invoiceData[row].reduce((acc, curr) => {
              //   // Remove commas and parse the total_donation_amount to a float
              //   return acc + parseFloat(curr.total_donation_amount.replace(/,/g, ''));
              // }, 0);
              const amount = row.donation.reduce(
                (acc, curr) =>
                  acc + parseFloat(curr.donation_amount.replace(/,/g, "")),
                0
              );

              // const amount = 2;
              return (
                <>
                  <tr
                    key={rowIndex}
                    onClick={() => {
                      if (isRowExpand == row) {
                        setIsRowExpand("");
                      } else {
                        setIsRowExpand(row);
                      }
                    }}
                    className="border-b hover:bg-gray-50 transition-all duration-300"
                  >
                    {/* empty */}
                    {/* <td className="p-4 text-center">{rowIndex + 1}</td> */}
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {row.invoice_id}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {formatDate(row.from_date)}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {formatDate(row.to_date)}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      <span
                        className={`px-2 py-1 text-xs font-medium ${
                          row.status == "pending"
                            ? "text-yellow-600 bg-yellow-100"
                            : "text-green-600 bg-green-100"
                        } bg-green-100 rounded-full`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 ">{amount.toFixed(2)}</td>
                    <td className="px-6 py-4 ">{row.discount}%</td>
                    <td className="px-6 py-4 ">
                      {calculateDiscountedAmount(amount, row)}
                    </td>
                    <td className="px-6 py-4 ">
                      <button
                        
                        className="text-[#02343F] transition-all duration-300"
                      >
                        {isRowExpand === row ? (
                          <ChevronUpIcon className="w-5 h-5" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5" />
                        )}
                      </button>
                    </td>
                    <td className="px-3 py-4 font-medium">
                      {/* Only show the "Download PDF" button after the PDF is generated */}
                      {generatedPDF === row.invoice_id && (
                        <PDFDownloadLink
                          document={<InvoicePDF invoiceData={invoiceData} />}
                          fileName={`invoice-${row.invoice_id}.pdf`}
                        >
                          {({ loading }) => (
                            <button className="text-[#02343F] bg-[#02343F]/7 shadow-[#02343F]/7 shadow-lg p-3 rounded-lg hover:text-[#02343F]*3 transition-all duration-300 text-xs  flex justify-center items-center">
                              {loading ? (
                                ""
                              ) : (
                                <Download className="w-5 h-5 transition-transform group-hover:scale-110 animate-bounce " />
                              )}
                              {loading ? "Loading..." : "Download PDF"}
                            </button>
                          )}
                        </PDFDownloadLink>
                      )}

                      {/* Show the "Generate PDF" button only if the PDF is not yet generated */}
                      {generatedPDF !== row.invoice_id && !isGeneratingPDF && (
                        <button
                          onClick={() => handleGeneratePDF(row)} // Trigger the PDF generation
                          className="bg-[#02343F] text-gray-300 shadow-[#02343F]/3 shadow-lg p-3 rounded-lg hover:text-[#02343F]*3 transition-all duration-300 text-xs"
                        >
                          Generate PDF
                        </button>
                      )}
                    </td>
                  </tr>
                  {isRowExpand === row && (
                    <tr className="transition-all duration-500 ease-in-out">
                      <td colSpan={9}>
                        {row?.donation && row.donation.length > 0 ? (
                          <table className="w-full text-sm text-left border-t-2">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                              <tr>
                                <th className="px-4 py-2 font-medium text-gray-700">
                                  Donation Id
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-700">
                                  Donor Name
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-700">
                                  Program Name
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-700">
                                  Program Country
                                </th>
                                <th className="px-4 py-2 font-medium text-gray-700">
                                  Total Donation Amount
                                </th>
                              </tr>
                            </thead>

                            {/* dummy */}
                            <tbody>
                              {row?.donation.map((invoice, index) => (
                                <tr
                                  key={index}
                                  className="border-b hover:bg-gray-50 transition-all duration-300"
                                >
                                  <td className="px-4 py-2">
                                    {invoice.donation_id}
                                  </td>
                                  <td className="px-4 py-2">
                                    {invoice.donor_name}
                                  </td>
                                  <td className="px-4 py-2">
                                    {invoice.program_name}
                                  </td>
                                  <td className="px-4 py-2">
                                    {invoice.country_name}
                                  </td>
                                  <td className="px-4 py-2">
                                    {invoice.donation_amount}
                                  </td>
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
