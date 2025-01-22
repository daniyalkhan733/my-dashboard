import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, ChevronDown, ChevronUp, X } from "lucide-react";
import Loader from '../loader';

const DonationReport = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);  


  const validateDonationData = (data) => {
    if (!Array.isArray(data)) return false;
    return data.every(item => 
      item.donation_date &&
      item.donor_id &&
      item.donor_name &&
      item.category &&
      typeof item.donation_amount === 'number' &&
      item.program_name &&
      item.program_country
    );
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // Download CSV function
  const downloadCSV = () => {
    const headers = [
      'Date',
      'Donation ID',
      'Donor Name',
      'Category',
      'Amount',
      'Program Name',
      'Program Country'
    ];

    const csvData = filteredData.map(row => [
      formatDate(row.donation_date),
      row.donor_id,
      row.donor_name,
      row.category,
      row.donation_amount,
      row.program_name,
      row.program_country
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'donation_report.csv';
    link.click();
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://6641e98f3d66a67b34356a00.mockapi.io/api/v1/programs-so');
        
        if (validateDonationData(response.data)) {
          setDonations(response.data);
        } else {
          console.warn('Invalid API data format, using fallback data');
          setDonations(fallbackData);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching donations:', err);
        setDonations(fallbackData);
        setError('Using sample data - Unable to fetch live donations');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) {
    return (
       <Loader />
    );
  }

  const columns = [
    { key: 'donation_date', label: 'Date', type: 'date' },
    { key: 'donor_id', label: 'Donation ID', type: 'text' },
    { key: 'donor_name', label: 'Donor Name', type: 'text' },
    { key: 'category', label: 'Category', type: 'select', 
      options: ['Education', 'Healthcare', 'Environment', 'Social Services'] },
    { key: 'donation_amount', label: 'Amount', type: 'number' },
    { key: 'program_name', label: 'Program Name', type: 'text' },
    { key: 'program_country', label: 'Program Country', type: 'text' }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  const clearFilter = (key) => {
    const { [key]: removed, ...remaining } = filters;
    setFilters(remaining);
  };

  const filteredData = donations.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      if (key === 'donation_amount') {
        return item[key] >= parseFloat(value);
      }
      return item[key]?.toString().toLowerCase().includes(value.toLowerCase());
    });
  });

  return (
    <div className="w-full space-y-4">
      {/* Filter Accordion */}
      <div className="w-full rounded-lg shadow-sm border border-[#F5E6D3]">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-[#F5E6D3]/10 transition-colors rounded-lg"
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
          <div className="px-6 py-4 border-t border-[#F5E6D3]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {columns.map(({ key, label, type, options }) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{label}</label>
                  {type === 'select' ? (
                    <select
                      value={filters[key] || ''}
                      onChange={(e) => handleFilterChange(key, e.target.value)}
                      className="w-full p-2 border border-[#F5E6D3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
                    >
                      <option value="">All</option>
                      {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : type === 'number' ? (
                    <input
                      type="number"
                      value={filters[key] || ''}
                      onChange={(e) => handleFilterChange(key, e.target.value)}
                      placeholder="Min amount..."
                      className="w-full p-2 border border-[#F5E6D3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
                    />
                  ) : type === 'date' ? (
                    <input
                      type="date"
                      value={filters[key] || ''}
                      onChange={(e) => handleFilterChange(key, e.target.value)}
                      className="w-full p-2 border border-[#F5E6D3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
                    />
                  ) : (
                    <input
                      type="text"
                      value={filters[key] || ''}
                      onChange={(e) => handleFilterChange(key, e.target.value)}
                      placeholder={`Filter by £{label.toLowerCase()}...`}
                      className="w-full p-2 border border-[#F5E6D3] rounded-md focus:outline-none focus:ring-2 focus:ring-[#02343F]"
                    />
                  )}
                </div>
              ))}
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
                  <div key={key} className="flex items-center bg-[#F5E6D3] px-2 py-1 rounded-md">
                    <span className="text-sm mr-2">
                      {columns.find(col => col.key === key)?.label}: {value}
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

     
  {/* Table Actions */}
  <div className="flex justify-between items-center px-4">
      <div className="text-sm text-gray-600">
          {filteredData.length} results found
        </div>
        <button
          onClick={downloadCSV}
          className="flex items-center px-4 py-2 bg-[#02343F] text-white rounded-md hover:bg-[#02343F]/90 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Download CSV
        </button>
       
      </div>
      {/* Table */}
      <div className="relative overflow-x-auto rounded-md shadow-lg" 
           style={{
             maxHeight: '70vh',
             scrollbarWidth: 'thin',
             scrollbarColor: '#004D40 white'
           }}>
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-[#02343F] text-white">
            <tr>
              {columns.map(({ key, label }) => (
                <th key={key} className="p-4 font-semibold">
                  <span>{label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5E6D3] bg-white">
            {filteredData.map((donation, index) => (
              <tr 
                key={index}
                className="hover:bg-[#F5E6D3]/20 transition-colors duration-200"
              >
                <td className="p-4">{formatDate(donation.donation_date)}</td>
                <td className="p-4">{donation.donor_id || 'N/A'}</td>
                <td className="p-4">{donation.donor_name || 'Anonymous'}</td>
                <td className="p-4">{donation.category || 'Uncategorized'}</td>
                <td className="p-4">£{(donation.donation_amount || 0).toLocaleString()}</td>
                <td className="p-4">{donation.program_name || 'General Fund'}</td>
                <td className="p-4">{donation.program_country || 'International'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};

export default DonationReport;