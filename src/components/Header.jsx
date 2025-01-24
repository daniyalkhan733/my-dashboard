import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from 'lucide-react';

const Header = ({ charityName }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl md:text-2xl font-bold">{`${charityName} Dashboard`}</h1>
        
        <div className="flex space-x-3 mt-4 md:mt-0 relative">
          <div className="relative inline-block text-left w-full" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 bg-white rounded-full shadow-md hover:bg-indigo-50 focus:outline-none w-full md:w-auto flex justify-center"
            >
              <img src="/assets/svg/setting.svg" alt="" className="w-8 p-1" />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`
                ${isDropdownOpen ? "block" : "hidden"} 
                absolute right-0 left-0 md:left-auto mt-2 w-full md:w-56 
                rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 
                focus:outline-none z-50
              `}
            >
              <div className="py-1">
                <div className="px-4 py-2 text-sm text-gray-900">
                  <p className="font-bold">Daniyal Khan</p>
                  <p className="text-gray-500">Administrator</p>
                </div>
                
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                 <User className="pr-1"/>
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;