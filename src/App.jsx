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

function App() {
  const queryClient = new QueryClient();

  const LayoutWrapper = ({ children }) => {
    const location = useLocation();
    const noLayoutPaths = ["/login"]; // Define routes without layout

    const isNoLayout = noLayoutPaths.includes(location.pathname);

    return isNoLayout ? children : <DashboardLayout>{children}</DashboardLayout>;
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <LayoutWrapper>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/report/donation" element={<DonationReport />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </LayoutWrapper>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
