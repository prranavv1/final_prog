import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import CurrentEngagements from "./pages/CurrentEngagements";
import Navbar from "./components/Navbar";

import NewJob from "./pages/NewJob";
import UpdateJob from "./pages/UpdateJob";
import JobDetails from "./pages/JobDetails";
import PendingInvoice from "./pages/PendingInvoice";
import JobFinancials from "./pages/JobFinancials";
import JobExpenses from "./pages/JobExpenses";
import AccountsReceivable from "./pages/AccountsReceivable";
import JobSummary from "./pages/JobSummary";
import PaymentSummary from "./pages/PaymentSummary";
import AssetSummary from "./pages/AssetSummary";
import AddUser from "./pages/AddUser";

function Layout() {
  const location = useLocation();

  // Hide navbar only on Login page
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/current-engagements" element={<CurrentEngagements />} />

        <Route path="/new-job" element={<NewJob />} />
        <Route path="/update-job" element={<UpdateJob />} />
        <Route path="/job-details" element={<JobDetails />} />

        <Route path="/job-financials" element={<JobFinancials />} />
        <Route path="/job-expenses" element={<JobExpenses />} />
        <Route path="/accounts-receivable" element={<AccountsReceivable />} />
        <Route path="/pending-invoice" element={<PendingInvoice />} />

        <Route path="/job-summary" element={<JobSummary />} />
        <Route path="/payment-summary" element={<PaymentSummary />} />
        <Route path="/asset-summary" element={<AssetSummary />} />

        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
