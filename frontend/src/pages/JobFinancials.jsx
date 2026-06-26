import { useState } from "react";
import axios from "axios";
import "../styles/JobFinancials.css";

function JobFinancials() {
  // Search
  const [searchJobNo, setSearchJobNo] = useState("");

  // Autofilled Job Details
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

  // Financial Fields (Editable)
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceNetAmount, setInvoiceNetAmount] = useState("");
  const [invoiceGSTAmount, setInvoiceGSTAmount] = useState("");
  const [invoiceGrossAmount, setInvoiceGrossAmount] = useState("");
  const [paymentDueDate, setPaymentDueDate] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [invoicePaymentStatus, setInvoicePaymentStatus] = useState("");

  const paymentStatusOptions = [
    "Not Paid",
    "Partially Paid",
    "Paid"
  ];

  // Search Job
  const handleSearch = async () => {
    if (!searchJobNo) {
      alert("Please enter Job Number");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8000/jobs/${searchJobNo}`);
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

      alert("Job financials saved successfully! Pending invoices updated automatically.");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to save job financials");
    }
  };

  return (
    <div className="jf-page">
      {/* Page Header */}
      <div className="jf-header">
        <h2>Job Financials</h2>
      </div>

      {/* Main Form */}
      <div className="jf-form-container">
        
        {/* Row 1: Job No, Customer, Job Start Date, Job Finish Date */}
        <div className="jf-form-row">
          <div className="jf-field">
            <label>Job No</label>
            <div className="jf-search-container">
              <input
                type="text"
                placeholder="With Button"
                value={searchJobNo}
                onChange={(e) => setSearchJobNo(e.target.value)}
              />
              <button className="jf-search-btn" onClick={handleSearch}>🔍</button>
            </div>
          </div>

          <div className="jf-field">
            <label>Customer</label>
            <div className="jf-search-container">
              <input
                type="text"
                placeholder="With Button"
                value={customer}
                readOnly
              />
              <button className="jf-search-btn">🔍</button>
            </div>
          </div>

          <div className="jf-field">
            <label>Job Start Date</label>
            <select value={jobStartDate || ""} disabled>
              <option value="">{jobStartDate || "Select"}</option>
            </select>
          </div>

          <div className="jf-field">
            <label>Job Finish Date</label>
            <select value={jobEndDate || ""} disabled>
              <option value="">{jobEndDate || "Select"}</option>
            </select>
          </div>
        </div>

        {/* Row 2: Site, State, Country, Product/Service */}
        <div className="jf-form-row">
          <div className="jf-field">
            <label>Site</label>
            <input type="text" placeholder="Default input" value={site} readOnly />
          </div>

          <div className="jf-field">
            <label>State</label>
            <select value={state} disabled>
              <option>Select option</option>
              <option>{state}</option>
            </select>
          </div>

          <div className="jf-field">
            <label>Country</label>
            <select value={country} disabled>
              <option>Select option</option>
              <option>{country}</option>
            </select>
          </div>

          <div className="jf-field">
            <label>Product/Service</label>
            <select value={productService} disabled>
              <option>Select option</option>
              <option>{productService}</option>
            </select>
          </div>
        </div>

        {/* Row 3: Invoice Number, Current Job Status, Job Report Status, Invoice Payment Status */}
        <div className="jf-form-row">
          <div className="jf-field">
            <label>Invoice Number</label>
            <input
              type="text"
              placeholder="Default input"
              value={invoiceNumber}
              onChange={(e) => {
                let value = e.target.value.toUpperCase();
                value = value.replace(/\s/g, "");

                if (value === "") {
                  setInvoiceNumber("");
                  return;
                }

                if (!value.startsWith("PROG/")) {
                  value = "PROG/";
                }

                const parts = value.split("/");
                let year = parts[1] || "";
                let number = parts[2] || "";

                year = year.replace(/[^0-9]/g, "").slice(0, 4);
                number = number.replace(/[^0-9]/g, "");

                let formatted = "PROG/";
                if (year) formatted += year;
                if (year && (value.endsWith("/") || parts.length > 2)) formatted += "/";
                if (number) formatted += number;

                setInvoiceNumber(formatted);
              }}
            />
          </div>

          <div className="jf-field">
            <label>Current Job Status</label>
            <select value={jobStatus} disabled>
              <option>Select option</option>
              <option>{jobStatus}</option>
            </select>
          </div>

          <div className="jf-field">
            <label>Job Report Status</label>
            <select value={jobReportStatus} disabled>
              <option>Select option</option>
              <option>{jobReportStatus}</option>
            </select>
          </div>

          <div className="jf-field">
            <label>Invoice Payment Status</label>
            <select
              value={invoicePaymentStatus}
              onChange={(e) => setInvoicePaymentStatus(e.target.value)}
            >
              <option>Select option</option>
              {paymentStatusOptions.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 4: Invoice Date, Invoice Net Amount, Invoice GST Amount, Invoice Gross Amount */}
        <div className="jf-form-row">
          <div className="jf-field">
            <label>Invoice Date</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </div>

          <div className="jf-field">
            <label>Invoice Net Amount(In Rs)</label>
            <input
              type="number"
              placeholder="Default input"
              value={invoiceNetAmount}
              onChange={(e) => setInvoiceNetAmount(e.target.value)}
            />
          </div>

          <div className="jf-field">
            <label>Invoice GST Amount(In Rs)</label>
            <input
              type="number"
              placeholder="Default input"
              value={invoiceGSTAmount}
              onChange={(e) => setInvoiceGSTAmount(e.target.value)}
            />
          </div>

          <div className="jf-field">
            <label>Invoice Gross Amount(In Rs)</label>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                placeholder="Default input"
                value={invoiceGrossAmount}
                onChange={(e) => setInvoiceGrossAmount(e.target.value)}
              />
              <span className="jf-calc-icon">🧮</span>
            </div>
          </div>
        </div>

        {/* Row 5: Payment Due Date, Payment Date, Upload Invoice, Upload Supporting docs */}
        <div className="jf-form-row">
          <div className="jf-field">
            <label>Payment Due Date</label>
            <input
              type="date"
              value={paymentDueDate}
              onChange={(e) => setPaymentDueDate(e.target.value)}
            />
          </div>

          <div className="jf-field">
            <label>Payment Date</label>
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </div>

          <div className="jf-field">
            <label>Upload Invoice</label>
            <div className="jf-file-upload">
              <input type="file" id="invoiceFile" hidden />
              <label htmlFor="invoiceFile" className="jf-file-btn">📁</label>
            </div>
          </div>

          <div className="jf-field">
            <label>Upload Supporting docs</label>
            <div className="jf-file-upload">
              <input type="file" id="supportingDocs" multiple hidden />
              <label htmlFor="supportingDocs" className="jf-file-btn">📁</label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="jf-actions">
          <button className="jf-btn jf-btn-cancel" onClick={() => window.history.back()}>
            Cancel
          </button>
          <button className="jf-btn jf-btn-save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobFinancials;