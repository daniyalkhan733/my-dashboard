import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
// InvoiceTable.jsx
import React, { useState } from "react";
import InvoiceFilterAccordion from "./common/InvoiceFilter";
import { useInvoiceData } from "../api/invoiceApi";
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from '../components/invoice/InvoicePDF'; 
import Loader from './loader';


const columns = [
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
    label: "Amount",
    field: "amount",
  },
  {
    label: "",
    render: (row) => <button onClick={() => alert("View Invoice", row)} className="text-blue-600">View</button>, // Custom render for action column
  },
];

const InvoiceTable = () => {
  const [isRowExpand, setIsRowExpand] = useState(false);

  const {
    data: { data: invoiceData = [] } = {},
    isLoading: isInvoiceLoading,
    isError: isInvoiceError,
    error: invoiceError,
  } = useInvoiceData();

  if (isInvoiceLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <InvoiceFilterAccordion />

      <div className="max-w-full overflow-x-auto h-[80vh] overflow-y-auto bg-white rounded-lg shadow">

        <table className="w-full text-sm text-left border-collapse transition-all ">
          {/* Table Head */}
          <thead className="bg-[#02343F] text-white uppercase text-xs">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-6 py-3 border-b-2">{column.label}</th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {Object.keys(invoiceData).reverse().map((row, rowIndex) => {
              const amount = invoiceData[row].reduce((acc, curr) => {
                // Remove commas and parse the total_donation_amount to a float
                return acc + parseFloat(curr.total_donation_amount.replace(/,/g, ''));
              }, 0);
              console.log(row.split(" - ")[0].replaceAll("_","/"));
              
              return (
                <>
                  <tr key={rowIndex} onClick={() => {
                    if (isRowExpand == row) {
                      setIsRowExpand("");
                    } else {
                      setIsRowExpand(row);
                    }
                  }} className="border-b hover:bg-gray-50 transition-all duration-300">
                    <td className="p-4 text-center">{rowIndex + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{rowIndex + 121}</td>
                    <td className="px-6 py-4 font-medium">{row}</td>
                    <td className="px-6 py-4 font-medium">
                      <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">
                        {"pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 ">{amount.toFixed(2)}</td>
                    <td className="px-6 py-4 font-medium">
                      <button
                        onClick={() => {
                          if (isRowExpand == row) {
                            setIsRowExpand("");
                          } else {
                            setIsRowExpand(row);
                          }
                        }}
                        className="text-[#02343F] transition-all duration-300"
                      >
                        {isRowExpand === row ? (
                          <ChevronUpIcon className="w-5 h-5" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5" />
                        )}
                      </button>
                      <PDFDownloadLink
                        document={<InvoicePDF invoiceData={invoiceData[row]} />}
                        fileName={`invoice ( ${row.split(" - ")[0].replaceAll("_","1")} ).pdf`}
                      >
                        {({ loading }) => (
                          <button
                            className="text-[#02343F] bg-gray-100 shadow-[#02343F]/3 shadow-lg p-3 rounded-lg ml-4 hover:text-[#02343F]*3 transition-all duration-300"
                          >
                            {loading ? "Loading..." : "Download PDF"}
                          </button>
                        )}
                      </PDFDownloadLink>
                    </td>
                  </tr>

                  {isRowExpand === row && (
                    <tr className="transition-all duration-500 ease-in-out">
                      <td colSpan={6} className="">
                        <table className="w-full text-sm text-left border-t-2">
                          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                              <th className="px-4 py-2 font-medium text-gray-700">Donor Name</th>
                              <th className="px-4 py-2 font-medium text-gray-700">Category</th>
                              <th className="px-4 py-2 font-medium text-gray-700">Program Name</th>
                              <th className="px-4 py-2 font-medium text-gray-700">Program Country</th>
                              <th className="px-4 py-2 font-medium text-gray-700">Total Donation Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoiceData[row].map((invoice, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50 transition-all duration-300">
                                <td className="px-4 py-2">{invoice.donor_name}</td>
                                <td className="px-4 py-2">{invoice.category}</td>
                                <td className="px-4 py-2">{invoice.program_name}</td>
                                <td className="px-4 py-2">{invoice.program_country}</td>
                                <td className="px-4 py-2">{invoice.total_donation_amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>


      </div>

    </div >
    // <div className="flex flex-col items-center justify-center mx-auto p-12 bg-white rounded-lg shadow-md">
    //   <div className=" rounded-full p-6 mb-6">
    //     <img
    //       src="/assets/images/logo.png"
    //       alt=""
    //       className="border-black border rounded-full w-40 h-40"
    //     />
    //   </div>
    //   <h2 className="text-2xl font-bold text-[#02343F] mb-4 text-center">
    //     Coming Soon...{" "}
    //   </h2>
    //   {/* <p className="text-gray-600 text-center max-w-md mb-6">
    //   It seems there are no invoices matching you.
    // </p> */}
    // </div>
  );
};
export default InvoiceTable;
