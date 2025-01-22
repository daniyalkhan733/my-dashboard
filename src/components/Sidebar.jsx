import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Menu, LayoutDashboard, FileText, PieChart, Users } from "lucide-react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/invoice")) {
      setActiveItem("invoice");
    } else if (path.includes("/report")) {
      setActiveItem("report");
    } else if (path.includes("/contact")) {
      setActiveItem("contact");
    } else if (path.includes("/dashboard")) {
      setActiveItem("dashboard");
    }
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.documentElement.style.overflow = !isSidebarOpen ? "hidden" : "";
    document.body.style.overflow = !isSidebarOpen ? "hidden" : "";
  };

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      Icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: "invoice",
      label: "Invoice",
      Icon: FileText,
      path: "/invoice",
    },
    {
      id: "report",
      label: "Report",
      Icon: PieChart,
      path: "/report/donation",
    },
    {
      id: "contact",
      label: "Contact",
      Icon: Users,
      path: "/contact",
    },
  ];

  return (
    <>
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block sm:w-64 bg-black text-white shadow-lg h-screen w-60 fixed z-50`}
      >
        <div className="flex justify-center pt-8 pb-3 px-2">
          <Link to="/">
            <img
              src="/assets/images/logo-sidebar.png"
              alt="Logo"
              className="h-full"
            />
          </Link>
        </div>

        <nav>
          <ul id="sidebar-menu">
            {navigationItems.map((item) => {
              const Icon = item.Icon;
              return (
                <Link to={item.path} key={item.id}>
                  <li
                    className={`relative group ${
                      activeItem === item.id ? "p-4" : "px-2 py-4"
                    } hover:bg-[#F0EDCC] hover:text-black cursor-pointer flex items-center transition-all duration-300`}
                    onClick={() => setActiveItem(item.id)}
                  >
                    <div
                      className={`absolute left-0 h-full w-1 bg-white ${
                        activeItem === item.id ? "" : "hidden"
                      }`}
                    />
                    <div className="flex items-center">
                      <span className="mr-4">
                        <Icon
                          className={`w-5 h-5 transition-colors duration-300 ${
                            activeItem === item.id
                              ? "text-white group-hover:text-black"
                              : "text-white group-hover:text-black"
                          }`}
                        />
                      </span>
                      <span
                        className={
                          activeItem === item.id ? "hover:text-black" : ""
                        }
                      >
                        {item.label}
                      </span>
                    </div>
                  </li>
                </Link>
              );
            })}
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