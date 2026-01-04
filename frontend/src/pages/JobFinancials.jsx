import React from "react";
import "../styles/JobFinancials.css";

function JobFinancials() {
  return (
    <div className="jobfin-container">
      <h2 className="jobfin-title">Job Financials</h2>

      <div className="jobfin-form">
        <div className="field">
          <label>Job No</label>
          <input placeholder="With Button" />
        </div>

        <div className="field">
          <label>Customer</label>
          <input placeholder="With Button" />
        </div>

        <div className="field">
          <label>Job Start Date</label>
          <input type="date" />
        </div>

        <div className="field">
          <label>Job Finish Date</label>
          <input type="date" />
        </div>

        <div className="field">
          <label>Site</label>
          <input />
        </div>

        <div className="field">
          <label>State</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Country</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Product / Service</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Invoice Number</label>
          <input />
        </div>

        <div className="field">
          <label>Current Job Status</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Job Report Status</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Invoice Payment Status</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Invoice Date</label>
          <input type="date" />
        </div>

        <div className="field">
          <label>Invoice Net Amount (in Rs)</label>
          <input />
        </div>

        <div className="field">
          <label>Invoice GST Amount (in Rs)</label>
          <input />
        </div>

        <div className="field">
          <label>Invoice Gross Amount (in Rs)</label>
          <input />
        </div>

        <div className="field">
          <label>Payment Due Date</label>
          <input type="date" />
        </div>

        <div className="field">
          <label>Payment Date</label>
          <input type="date" />
        </div>

        <div className="field">
          <label>Upload Invoice</label>
          <input type="file" />
        </div>

        <div className="field">
          <label>Upload Supporting docs</label>
          <input type="file" />
        </div>
      </div>

      <div className="jobfin-actions">
        <button className="cancel">Cancel</button>
        <button className="save">Save</button>
      </div>
    </div>
  );
}

export default JobFinancials;
