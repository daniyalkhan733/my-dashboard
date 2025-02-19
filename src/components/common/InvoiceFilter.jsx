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
            {/* Amount From */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Amount From</label>
              <input
                type="number"
                value={filters.amountFrom || ""}
                onChange={(e) => handleFilterChange("amountFrom", e.target.value)}
                placeholder="Min amount..."
                className="w-full p-2 border border-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
              />
            </div>

            {/* Amount To */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Amount To</label>
              <input
                type="number"
                value={filters.amountTo || ""}
                onChange={(e) => handleFilterChange("amountTo", e.target.value)}
                placeholder="Max amount..."
                className="w-full p-2 border border-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
              />
            </div>

            {/* From Date From */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">From Date (From)</label>
              <input
                type="date"
                value={filters.fromDateFrom || ""}
                onChange={(e) => handleFilterChange("fromDateFrom", e.target.value)}
                className="w-full p-2 border border-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
              />
            </div>

            {/* From Date To */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">From Date (To)</label>
              <input
                type="date"
                value={filters.fromDateTo || ""}
                onChange={(e) => handleFilterChange("fromDateTo", e.target.value)}
                className="w-full p-2 border border-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
              />
            </div>

            {/* To Date From */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">To Date (From)</label>
              <input
                type="date"
                value={filters.toDateFrom || ""}
                onChange={(e) => handleFilterChange("toDateFrom", e.target.value)}
                className="w-full p-2 border border-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
              />
            </div>

            {/* To Date To */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">To Date (To)</label>
              <input
                type="date"
                value={filters.toDateTo || ""}
                onChange={(e) => handleFilterChange("toDateTo", e.target.value)}
                className="w-full p-2 border border-primary-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
              />
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
                    {key}: {value}
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
