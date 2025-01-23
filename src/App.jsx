import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import ContactForm from "./pages/contact";
import Invoice from "./pages/invoice";
import Profile from "./pages/profile";
import DonationReport from "./pages/report/donation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardLayout from "./layout/dashboard-layout";
import Login from "./pages/login";

const LayoutProvider = ({ children }) => {
  const location = useLocation();

  // Check if the current path is '/login'
  const isLoginPage = location.pathname === "/login";

  // Render without layout for the login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Render with DashboardLayout for other pages
  return <DashboardLayout>{children}</DashboardLayout>;
};


function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <LayoutProvider>
            {/* <Toaster /> */}
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/report/donation" element={<DonationReport />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </LayoutProvider>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
