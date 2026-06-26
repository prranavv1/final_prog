import React, { useState, useEffect } from "react";
import "../styles/PendingInvoice.css";
import axios from "axios";

function PendingInvoice() {
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [remarkText, setRemarkText] = useState("");

  const fetchPendingInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:8000/pending-invoices");
      setPendingInvoices(res.data.rows);
      setTotalAmount(res.data.total_amount);
    } catch (err) {
      console.error("Failed to load pending invoices", err);
    }
  };

  const saveRemarks = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/pending-invoices/${id}/remarks`,
        null,
        { params: { remarks: remarkText } }
      );
      setEditingId(null);
      fetchPendingInvoices();
    } catch (err) {
      alert("Failed to save remarks");
    }
  };

  const formatCurrency = (amount) => {
    return `₹ ${(amount || 0).toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
  };

  useEffect(() => {
    fetchPendingInvoices();
  }, []);

  return (
    <div className="ar-page">
      {/* Page Header */}
      <div className="ar-page-header">
        <h1>PENDING INVOICES</h1>
      </div>

      {/* Main Card */}
      <div className="ar-card">
        <div className="ar-card-header">
          <div>
            <h2>Pending Invoice</h2>
          </div>

          <div className="ar-total-box">
            <span>TOTAL PENDING AMOUNT</span>
            <h3>{formatCurrency(totalAmount)}</h3>
          </div>
        </div>

        {/* Table */}
        <div className="ar-table-wrapper">
          <table className="ar-table">
            <thead>
              <tr>
                <th style={{ width: "8%" }}>JOB #</th>
                <th style={{ width: "15%" }}>CLIENT</th>
                <th style={{ width: "12%" }}>SITE</th>
                <th style={{ width: "10%" }}>QUOTE AMT</th>
                <th style={{ width: "10%" }}>JOB FINISH</th>
                <th style={{ width: "10%" }}>REPORT FIN</th>
                <th style={{ width: "12%" }}>PENDING</th>
                <th style={{ width: "23%" }}>REMARKS</th>
              </tr>
            </thead>
            <tbody>
              {(pendingInvoices || []).map((invoice) => (
                <tr key={invoice.id}>
                  <td><span className="job-link">{invoice.job_no}</span></td>
                  <td><span className="client">{invoice.client}</span></td>
                  <td>{invoice.site}</td>
                  <td>{formatCurrency(invoice.quote_amount)}</td>
                  <td>{formatDate(invoice.job_finish_date)}</td>
                  <td>{invoice.report_finish_status}</td>

                  <td>
                    <div className="pending-info">
                      <span className="pending-amount">{formatCurrency(invoice.pending_amount)}</span>
                      <span className={`status ${invoice.invoicing_pending > 30 ? "overdue" : "pending"}`}>
                        {invoice.invoicing_pending > 0 ? `${invoice.invoicing_pending} Days` : "Recent"}
                      </span>
                    </div>
                  </td>

                  <td className="remarks-cell">
                    {editingId === invoice.id ? (
                      <div className="edit-container">
                        <input
                          value={remarkText}
                          onChange={(e) => setRemarkText(e.target.value)}
                          autoFocus
                          className="remark-input"
                        />
                        <button className="save-btn" onClick={() => saveRemarks(invoice.id)}>💾</button>
                        <button className="cancel-btn" onClick={() => setEditingId(null)}>❌</button>
                      </div>
                    ) : (
                      <div className="remark-display">
                        {invoice.remarks || <span className="no-remark">No remarks</span>}
                        <span
                          className="edit-icon"
                          onClick={() => {
                            setEditingId(invoice.id);
                            setRemarkText(invoice.remarks || "");
                          }}
                        >
                          ✏️
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pendingInvoices.length === 0 && (
            <div className="no-data">
              <p>No pending invoices found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PendingInvoice;
