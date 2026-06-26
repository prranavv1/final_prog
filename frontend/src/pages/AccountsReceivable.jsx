import React, { useState, useEffect } from "react";
import "../styles/AccountsReceivable.css";
import axios from "axios";

function AccountsReceivable() {
  const [receivables, setReceivables] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [remarkText, setRemarkText] = useState("");

  const saveRemarks = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/accounts-receivable/${id}/remarks`,
        null,
        { params: { remarks: remarkText } }
      );
      setEditingId(null);
      fetchAccountsReceivable();
    } catch (err) {
      console.error(err);
      alert("Failed to save remarks");
    }
  };

  // Fetch data from backend
  const fetchAccountsReceivable = async () => {
    try {
      const res = await axios.get("http://localhost:8000/accounts-receivable");
      setReceivables(res.data.rows);
      setTotalAmount(res.data.total_amount);
    } catch (err) {
      console.error("Failed to load Accounts Receivable", err);
    }
  };

  // Call API when page loads
  useEffect(() => {
    fetchAccountsReceivable();
  }, []);

  // Helper function for age styling
  function getAgeClass(age) {
    if (age > 60) return 'age-critical';
    if (age > 30) return 'age-warning';
    return 'age-normal';
  }

  return (
    <div className="ar-page">
      {/* Page Header */}
      <div className="ar-header">
        <h2>ACCOUNTS RECEIVABLE</h2>
        <p>Real-time financial tracking and outstanding invoice management</p>
        <div className="ar-header-stats">
          <div className="total-outstanding-card">
            <div className="total-label">Total Outstanding</div>
            <div className="total-amount">₹ {totalAmount.toLocaleString()}</div>
            <div className="total-trend">Pending collections</div>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="ar-main-form">
        <div className="ar-form-content">

          {/* Financial Summary Section */}
          <div className="financial-summary-section">
            <div className="section-header">
              <span className="section-number">01</span>
              <h3>Financial Summary</h3>
            </div>
            <div className="summary-cards">
              
              <div className="summary-card total">
                <div className="card-icon">📈</div>
                <div className="card-content">
                  <div className="card-label">Total Invoices</div>
                  <div className="card-value">{receivables.length}</div>
                  <div className="card-trend">Active accounts</div>
                </div>
              </div>

              <div className="summary-card overdue">
                <div className="card-icon">⚠️</div>
                <div className="card-content">
                  <div className="card-label">Overdue (&gt;30 days)</div>
                  <div className="card-value">{receivables.filter(r => r.invoice_age > 30).length}</div>
                  <div className="card-trend">Requires attention</div>
                </div>
              </div>

              <div className="summary-card critical">
                <div className="card-icon">🚨</div>
                <div className="card-content">
                  <div className="card-label">Critical (&gt;60 days)</div>
                  <div className="card-value">{receivables.filter(r => r.invoice_age > 60).length}</div>
                  <div className="card-trend">Urgent follow-up</div>
                </div>
              </div>

            </div>
          </div>

          {/* Accounts Table Section */}
          <div className="accounts-table-section">
            <div className="section-header">
              <span className="section-number">02</span>
              <h3>Outstanding Invoices</h3>
            </div>
            
            <div className="table-wrapper">
              <table className="accounts-table">
                <thead>
                  <tr>
                    <th>Job #</th>
                    <th>Invoice #</th>
                    <th>Client</th>
                    <th>Site</th>
                    <th>Invoice Amount</th>
                    <th>Job Finish</th>
                    <th>Invoice Date</th>
                    <th>Due Date</th>
                    <th>Age (Days)</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {receivables.length > 0 ? (
                    receivables.map((r) => (
                      <tr key={r.id}>
                        <td>
                          <span className="job-number-link">{r.job_no}</span>
                        </td>
                        <td>
                          <span className="invoice-number">{r.invoice_no}</span>
                        </td>
                        <td>
                          <div className="client-cell">
                            <div className="client-name">{r.client}</div>
                          </div>
                        </td>
                        <td>
                          <div className="site-location">{r.site}</div>
                        </td>
                        <td>
                          <div className="amount-cell">₹ {r.invoice_amount?.toLocaleString()}</div>
                        </td>
                        <td>{r.job_finish_date}</td>
                        <td>{r.invoice_date}</td>
                        <td>{r.due_date}</td>
                        <td>
                          <span className={`age-badge ${getAgeClass(r.invoice_age)}`}>
                            {r.invoice_age}
                          </span>
                        </td>
                        <td className="remarks-cell">
                          {editingId === r.id ? (
                            <div className="edit-container">
                              <input
                                className="remark-input"
                                value={remarkText}
                                onChange={(e) => setRemarkText(e.target.value)}
                                placeholder="Enter remarks..."
                              />
                              <div className="edit-actions">
                                <button 
                                  className="save-btn" 
                                  onClick={() => saveRemarks(r.id)}
                                  title="Save Remarks"
                                >
                                  💾
                                </button>
                                <button 
                                  className="cancel-btn" 
                                  onClick={() => setEditingId(null)}
                                  title="Cancel Edit"
                                >
                                  ❌
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="remark-display">
                              <div className="remark-text">
                                {r.remarks || <span className="no-remark">Add remark</span>}
                              </div>
                              <button
                                className="edit-remark-btn"
                                onClick={() => {
                                  setEditingId(r.id);
                                  setRemarkText(r.remarks || "");
                                }}
                                title="Edit Remarks"
                              >
                                ✏️
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="no-data">
                        <div className="no-data-message">
                          <span className="no-data-icon">💰</span>
                          <p>No outstanding invoices found</p>
                          <small>All accounts are up to date</small>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            {receivables.length > 0 && (
              <div className="table-footer">
                <span className="footer-text">
                  Displaying <strong>{receivables.length}</strong> outstanding invoice{receivables.length !== 1 ? 's' : ''} • 
                  Total Amount: <strong>₹ {totalAmount.toLocaleString()}</strong>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="ar-actions">
          <button className="ar-btn-refresh" onClick={fetchAccountsReceivable}>
            🔄 Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountsReceivable;