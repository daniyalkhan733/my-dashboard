import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import ContactForm from "./pages/contact";
import Invoice from "./pages/invoice";
import Profile from "./pages/profile";
import DonationReport from "./pages/report/donation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardLayout from "./layout/dashboard-layout";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
        <QueryClientProvider client={queryClient}>
      <Router>
<DashboardLayout>
        {/* <Toaster /> */}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/report/donation" element={<DonationReport />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
</DashboardLayout>
      </Router>
        </QueryClientProvider>
    </>
  );
}

export default App;
