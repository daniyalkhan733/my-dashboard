import React, { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const InvoiceFilterAccordion = ({ filters, setFilters }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilter = (key) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev };
      delete updatedFilters[key];
      return updatedFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  return (
    <div className="w-full rounded-lg shadow-sm border border-primary/80">
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="w-full px-6 py-4 flex justify-between items-center bg-white transition-colors rounded-lg"
      >
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-[#02343F]">Filters</span>
          {Object.keys(filters).length > 0 && (
            <span className="bg-[#02343F] text-white px-2 py-0.5 rounded-full text-sm">
              {Object.keys(filters).length}
            </span>
          )}
        </div>
        {isFilterOpen ? (
          <ChevronUp className="w-5 h-5 text-[#02343F]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#02343F]" />
        )}
      </button>

      {isFilterOpen && (
        <div className="px-6 py-4 border-t border-[#F5E6D3] bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Invoice ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">#</label>
              <input
                type="text"
                value={filters.id || ""}
                onChange={(e) => handleFilterChange("id", e.target.value)}
                placeholder="Invoice ID..."
                className="w-full p-2 border border-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
              />
            </div>

            {/* From Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">From Date</label>
              <input
                type="date"
                value={filters.from_date || ""}
                onChange={(e) => handleFilterChange("from_date", e.target.value)}
                className="w-full p-2 border border-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
              />
            </div>

            {/* To Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">To Date</label>
              <input
                type="date"
                value={filters.to_date || ""}
                onChange={(e) => handleFilterChange("to_date", e.target.value)}
                className="w-full p-2 border border-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                value={filters.status || ""}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full p-2 border border-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
              >
                <option value="">Select status...</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Amount</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={filters.amount_from || ""}
                  onChange={(e) => handleFilterChange("amount_from", e.target.value)}
                  placeholder="Min"
                  className="w-1/2 p-2 border border-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
                />
                <input
                  type="number"
                  value={filters.amount_to || ""}
                  onChange={(e) => handleFilterChange("amount_to", e.target.value)}
                  placeholder="Max"
                  className="w-1/2 p-2 border border-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
                />
              </div>
            </div>

            {/* Discount */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Discount</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={filters.discount_from || ""}
                  onChange={(e) => handleFilterChange("discount_from", e.target.value)}
                  placeholder="Min"
                  className="w-1/2 p-2 border border-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
                />
                <input
                  type="number"
                  value={filters.discount_to || ""}
                  onChange={(e) => handleFilterChange("discount_to", e.target.value)}
                  placeholder="Max"
                  className="w-1/2 p-2 border border-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
                />
              </div>
            </div>

            {/* Net Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Net Amount</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={filters.net_amount_from || ""}
                  onChange={(e) => handleFilterChange("net_amount_from", e.target.value)}
                  placeholder="Min"
                  className="w-1/2 p-2 border border-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
                />
                <input
                  type="number"
                  value={filters.net_amount_to || ""}
                  onChange={(e) => handleFilterChange("net_amount_to", e.target.value)}
                  placeholder="Max"
                  className="w-1/2 p-2 border border-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
                />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {Object.keys(filters).length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Clear all filters
              </button>
              {Object.entries(filters).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center bg-[#F5E6D3] px-2 py-1 rounded-md"
                >
                  <span className="text-sm mr-2">
                    {key.replace(/_/g, " ")}: {value}
                  </span>
                  <button onClick={() => clearFilter(key)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InvoiceFilterAccordion;