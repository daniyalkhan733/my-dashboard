import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const location = useLocation();

  useEffect(() => {
    // Set active item based on current URL path
    const path = location.pathname;
    if (path.includes('/invoice')) {
      setActiveItem('invoice');
    } else if (path.includes('/reports')) {
      setActiveItem('reports');
    } else if (path.includes('/contact')) {
      setActiveItem('contact');
    } else if (path.includes('/dashboard')) {
      setActiveItem('dashboard');
    }
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.documentElement.style.overflow = !isSidebarOpen ? 'hidden' : '';
    document.body.style.overflow = !isSidebarOpen ? 'hidden' : '';
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '/assets/svg/sidebar/dashboard-w.svg', path: '/dashboard' },
    { id: 'invoice', label: 'Invoice', icon: '/assets/svg/sidebar/invoice-w.svg', path: '/invoice' },
    { id: 'reports', label: 'Reports', icon: '/assets/svg/sidebar/reports-w.svg', path: '/reports' },
    { id: 'contact', label: 'Contact', icon: '/assets/svg/sidebar/contact-w.svg', path: '/contact' }
  ];

  return (
    <>
      <div
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block sm:w-64 bg-black text-white shadow-lg h-screen w-60 fixed z-50`}
      >
        <div className="flex justify-center pt-8 pb-3 px-2">
          <Link to="/">
            <img src="/assets/images/logo-sidebar.png" alt="Logo" className="h-full" />
          </Link>
        </div>
        
        <nav>
          <ul id="sidebar-menu">
            {navigationItems.map((item) => (
              <Link to={item.path} key={item.id}>
                <li
                  className={`relative ${
                    activeItem === item.id ? 'p-4' : 'px-2 py-4'
                  } hover:bg-[#F0EDCC] hover:text-black cursor-pointer flex items-center transition-all duration-300`}
                  onClick={() => setActiveItem(item.id)}
                >
                  <div
                    className={`absolute left-0 h-full w-1 bg-white ${
                      activeItem === item.id ? '' : 'hidden'
                    }`}
                  />
                  <div className="flex items-center">
                    <span className="mr-4">
                      <img src={item.icon} alt="" />
                    </span>
                    <span className={activeItem === item.id ? ' hover:text-black' : ''}>
                      {item.label}
                    </span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>

      <div id="main-content" className="ml-0 md:ml-64">
        {/* Main content goes here */}
      </div>

      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 right-4 z-50 bg-[#02343F] text-white p-2 rounded-full shadow-lg hover:bg-[#c2bf9b] focus:outline-none"
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
};

export default Sidebar;