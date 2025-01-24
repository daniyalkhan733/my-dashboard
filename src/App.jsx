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
import useEncryptedClientData from "./utils/getClient";

// LayoutProvider handles authentication and layout decisions
const LayoutProvider = ({ children }) => {
  const location = useLocation();
  const [clientData] = useEncryptedClientData();

  const isLoginPage = location.pathname === "/login";
  const isAuthenticated = !!clientData?.clientId;

  // Redirect unauthenticated users to the login page
  if (!isAuthenticated && !isLoginPage) {
    return <Navigate to="/login" replace />;
  }

  // Prevent authenticated users from accessing the login page
  if (isAuthenticated && isLoginPage) {
    return <Navigate to="/dashboard" replace />;
  }

  // Apply layout only for authenticated users on non-login pages
  return isAuthenticated && !isLoginPage ? (
    <DashboardLayout>{children}</DashboardLayout>
  ) : (
    <>{children}</>
  );
};

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <LayoutProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/report/donation" element={<DonationReport />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
          </Routes>
        </LayoutProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
