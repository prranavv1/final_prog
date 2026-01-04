import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NewJob from "./pages/NewJob";
import Navbar from "./components/Navbar";
import UpdateJob from "./pages/UpdateJob";
import JobFinancials from "./pages/JobFinancials";
import JobExpenses from "./pages/JobExpenses";
import AccountsReceivable from "./pages/AccountsReceivable";
import PendingInvoice from "./pages/PendingInvoice";
import JobDetails from "./pages/JobDetails"; 
import JobSummary from "./pages/JobSummary";
import PaymentSummary from "./pages/PaymentSummary";
import AssetSummary from "./pages/AssetSummary";


function App() {
  return (
    <BrowserRouter>
      {/* Navbar visible on all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/new-job" element={<NewJob />} />
        <Route path="/update-job" element={<UpdateJob />} />
        <Route path="/job-financials" element={<JobFinancials />} />
        <Route path="/job-expenses" element={<JobExpenses />} />
        <Route path="/accounts-receivable" element={<AccountsReceivable />} />
        <Route path="/pending-invoice" element={<PendingInvoice />} />
        <Route path="/job-details" element={<JobDetails />} />
        <Route path="/job-summary" element={<JobSummary />} />
        <Route path="/payment-summary" element={<PaymentSummary />} />
        <Route path="/asset-summary" element={<AssetSummary />} />

 


      </Routes>
    </BrowserRouter>
  );
}

export default App;
