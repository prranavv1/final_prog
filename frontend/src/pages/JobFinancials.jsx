import React, { useState } from "react";
import axios from "axios";
import "../styles/JobFinancials.css";

function JobFinancials() {

  /* 🔍 Search */
  const [searchJobNo, setSearchJobNo] = useState("");

  /* 🧾 Autofilled Job Details */
  const [jobNo, setJobNo] = useState("");
  const [customer, setCustomer] = useState("");
  const [jobStartDate, setJobStartDate] = useState("");
  const [jobEndDate, setJobEndDate] = useState("");
  const [site, setSite] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [productService, setProductService] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [jobReportStatus, setJobReportStatus] = useState("");

  /* 💰 Financial Fields (Editable) */
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceNetAmount, setInvoiceNetAmount] = useState("");
  const [invoiceGSTAmount, setInvoiceGSTAmount] = useState("");
  const [invoiceGrossAmount, setInvoiceGrossAmount] = useState("");
  const [paymentDueDate, setPaymentDueDate] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [invoicePaymentStatus, setInvoicePaymentStatus] = useState("");
  const [isExisting, setIsExisting] = useState(false);



  const paymentStatusOptions = [
    "Not Paid",
    "Partially Paid",
    "Paid"
  ];

  /* 🔎 SEARCH JOB */
  const handleSearch = async () => {
    if (!searchJobNo) {
      alert("Please enter Job Number");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8000/jobs/${searchJobNo}`
      );

      const data = res.data;

      setJobNo(data.job_no);
      setCustomer(data.customer_name);
      setJobStartDate(data.job_start_date || "");
      setJobEndDate(data.job_end_date || "");
      setSite(data.job_site || "");
      setState(data.job_state || "");
      setCountry(data.job_country || "");
      setProductService(data.product_service || "");
      setJobStatus(data.job_work_status || "");
      setJobReportStatus(data.job_report_status || "");

    } catch (err) {
      alert("Job not found");
    }
  };
  const handleSave = async () => {
  try {
    await axios.post("http://localhost:8000/job-financials", {
      job_no: Number(jobNo),

      invoice_number: invoiceNumber,
      invoice_date: invoiceDate,

      invoice_net_amount: Number(invoiceNetAmount),
      invoice_gst_amount: Number(invoiceGSTAmount),
      invoice_gross_amount: Number(invoiceGrossAmount),

      payment_due_date: paymentDueDate,
      payment_date: paymentDate,
      invoice_payment_status: invoicePaymentStatus
    });

    alert("Job financials saved successfully");
  } catch (err) {
    console.error(err.response?.data || err);
    alert("Failed to save job financials");
  }
};


  return (
    <div className="jobfin-container">

  <div className="page-header">
    <h1>FINANCIALS</h1>
  </div>

  <div className="form-card">

      <div className="form-header">
        <div className="header-actions">

  <div>
    <h2>JOB FINANCIALS</h2>
    <p>Invoicing & Tax Reconciliation</p>
  </div>
  <div>
    <button className="cancel-btn">Cancel</button>
    <button className="save-btn" onClick={handleSave}>Save Record</button>
  </div>
</div>
</div>

      <div className="jobfin-form">



        {/* 🔹 Autofilled Job Info */}
        <div className="field" style={{ position: "relative" }}>
  <label>Job No *</label>
  <input
    type="number"
    value={searchJobNo}
    onChange={(e) => setSearchJobNo(e.target.value)}
    placeholder="Enter Job Number"
    style={{ paddingRight: "35px" }}
  />

  <span
    onClick={handleSearch}
    style={{
      position: "absolute",
      right: "10px",
      top: "32px",
      cursor: "pointer",
      fontSize: "16px",
      color: "#001f3f"
    }}
    title="Search"
  >
    🔍
  </span>
</div>


        <div className="field">
          <label>Customer</label>
          <input value={customer} disabled />
        </div>

        <div className="field">
          <label>Job Start Date</label>
          <input type="date" value={jobStartDate} disabled />
        </div>

        <div className="field">
          <label>Job Finish Date</label>
          <input type="date" value={jobEndDate} disabled />
        </div>

        <div className="field">
          <label>Site</label>
          <input value={site} disabled />
        </div>

        <div className="field">
          <label>State</label>
          <input value={state} disabled />
        </div>

        <div className="field">
          <label>Country</label>
          <input value={country} disabled />
        </div>

        <div className="field">
          <label>Product / Service</label>
          <input value={productService} disabled />
        </div>

        <div className="field">
          <label>Current Job Status</label>
          <input value={jobStatus} disabled />
        </div>

        <div className="field">
          <label>Job Report Status</label>
          <input value={jobReportStatus} disabled />
        </div>

        {/* 💰 Financial Inputs */}
        <div className="field">
          <label>Invoice Number</label>
          <input
  value={invoiceNumber}
  onChange={(e) => {
    let value = e.target.value.toUpperCase();

    // Remove spaces
    value = value.replace(/\s/g, "");

    // If user deletes everything
    if (value === "") {
      setInvoiceNumber("");
      return;
    }

    // Allow typing but enforce PROG/ prefix
    if (!value.startsWith("PROG/")) {
      value = "PROG/";
    }

    // Split parts
    const parts = value.split("/");

    let year = parts[1] || "";
    let number = parts[2] || "";

    // Allow only digits
    year = year.replace(/[^0-9]/g, "").slice(0, 4);      // max 4 digits
    number = number.replace(/[^0-9]/g, "");

    let formatted = "PROG/";

    if (year) formatted += year;
    if (year && (value.endsWith("/") || parts.length > 2)) formatted += "/";
    if (number) formatted += number;

    setInvoiceNumber(formatted);
  }}
  placeholder="PROG/YYYY/Number"
/>


        </div>

        <div className="field">
          <label>Invoice Date</label>
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Invoice Net Amount (₹)</label>
          <input
            value={invoiceNetAmount}
            onChange={(e) => setInvoiceNetAmount(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Invoice GST Amount (₹)</label>
          <input
            value={invoiceGSTAmount}
            onChange={(e) => setInvoiceGSTAmount(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Invoice Gross Amount (₹)</label>
          <input
            value={invoiceGrossAmount}
            onChange={(e) => setInvoiceGrossAmount(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Payment Due Date</label>
          <input
            type="date"
            value={paymentDueDate}
            onChange={(e) => setPaymentDueDate(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Payment Date</label>
          <input
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Invoice Payment Status</label>
          <select
            value={invoicePaymentStatus}
            onChange={(e) => setInvoicePaymentStatus(e.target.value)}
          >
            <option value="">Select</option>
            {paymentStatusOptions.map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Upload Section */}
<div className="upload-section">
  <div className="upload-box">
    <input type="file" id="finalInvoice" hidden />
    <label htmlFor="finalInvoice" className="upload-label">
      📄
      <p>Final Invoice</p>
    </label>
  </div>

  <div className="upload-box active">
    <input type="file" id="supportDocs" hidden multiple />
    <label htmlFor="supportDocs" className="upload-label">
      ⬆️
      <p>Supporting Docs</p>
    </label>
  </div>
</div>
{/* Close jobfin-form */}
</div>



{/* Close form-card */}
</div>

{/* Close jobfin-container */}
</div>

  );
}

export default JobFinancials;
