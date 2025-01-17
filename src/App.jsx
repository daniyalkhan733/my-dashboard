import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";

import Invoice from "./pages/invoice";

function App() {

  return (
      <>
        <Router>
          {/* <Toaster /> */}
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invoice" element={<Invoice />} />
            {/* <Route path="/reports" element={<Checkout />} />
            <Route path="/contact" element={<Checkout />} /> */}


            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </>
  );
}

export default App;
