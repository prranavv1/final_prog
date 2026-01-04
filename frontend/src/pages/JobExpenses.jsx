import React from "react";
import "../styles/JobExpenses.css";

function JobExpenses() {
  return (
    <div className="jobexp-container">
      <h2 className="jobexp-title">Job Expenses</h2>

      {/* TOP DETAILS */}
      <div className="jobexp-form">
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
      </div>

      {/* EXPENSE TABLE */}
      <div className="expense-box">
        <div className="expense-header">
          <span>Expense Type</span>
          <span>Expense Amount</span>
          <span>Expense Date</span>
          <span>Expense Payment Status</span>
          <span>Expense Submitted by</span>
          <span>Upload Doc</span>
        </div>

        <div className="expense-row">
          <select><option>Select option</option></select>
          <input placeholder="Amount" />
          <input type="date" />
          <select><option>Select option</option></select>
          <select><option>Select option</option></select>
          <input type="file" />
        </div>

        {/* SAMPLE ROWS (as shown in image) */}
        <div className="expense-row data">
          <span>Travel</span>
          <span>13,500</span>
          <span>23/07/2025</span>
          <span>Payment Done</span>
          <span>Harish</span>
          <span>📄 ✏️ 🗑️</span>
        </div>

        <div className="expense-row data">
          <span>Accommodation</span>
          <span>8,700</span>
          <span>23/07/2025</span>
          <span>In Process</span>
          <span>Harish</span>
          <span>📄 ✏️ 🗑️</span>
        </div>
      </div>

      <div className="jobexp-actions">
        <button className="cancel">Cancel</button>
        <button className="save">Save</button>
      </div>
    </div>
  );
}

export default JobExpenses;
