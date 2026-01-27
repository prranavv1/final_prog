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

  // 🔥 Fetch data from backend
  const fetchAccountsReceivable = async () => {
    try {
      const res = await axios.get("http://localhost:8000/accounts-receivable");
      setReceivables(res.data.rows);
      setTotalAmount(res.data.total_amount);
    } catch (err) {
      console.error("Failed to load Accounts Receivable", err);
    }
  };

  // 🔥 Call API when page loads
  useEffect(() => {
    fetchAccountsReceivable();
  }, []);

  return (
  <div className="ar-page">

    {/* Page Title */}
    <div className="ar-page-header">
      <h1>RECEIVABLES</h1>
      <p>Manage and track your engineering workflows.</p>
    </div>

    {/* White Card */}
    <div className="ar-card">

      {/* Card Header */}
      <div className="ar-card-header">
        <div>
          <h2>RECEIVABLES LEDGER</h2>
          <p>Real-time financial tracking</p>
        </div>

        <div className="ar-total-box">
          <span>TOTAL OUTSTANDING</span>
          <h3>{totalAmount.toLocaleString()}</h3>
        </div>
      </div>

      {/* Table */}
      <div className="ar-table-wrapper">
        <div className="ar-table-header">
          <span>JOB #</span>
          <span>INVOICE #</span>
          <span>CLIENT</span>
          <span>SITE</span>
          <span>INV AMT</span>
          <span>JOB FINISH</span>
          <span>INV DATE</span>
          <span>DUE DATE</span>
          <span>AGE (DAYS)</span>
          <span>REMARKS</span>
          <span>ACTION</span>
        </div>

        {receivables.map((r) => (
          <div className="ar-row" key={r.id}>
            <span className="job-link">{r.job_no}</span>
            <span>{r.invoice_no}</span>
            <span className="client">{r.client}</span>
            <span>{r.site}</span>
            <span>{r.invoice_amount?.toLocaleString()}</span>
            <span>{r.job_finish_date}</span>
            <span>{r.invoice_date}</span>
            <span>{r.due_date}</span>
            <span className={`age ${r.invoice_age > 30 ? "danger" : ""}`}>
              {r.invoice_age}
            </span>

            <span className="remarks">
              {editingId === r.id ? (
                <>
                  <input
                    value={remarkText}
                    onChange={(e) => setRemarkText(e.target.value)}
                  />
                  <button onClick={() => saveRemarks(r.id)}>Save</button>
                </>
              ) : (
                <>
                  {r.remarks || "Add remark"}
                  <span
                    className="edit-icon"
                    onClick={() => {
                      setEditingId(r.id);
                      setRemarkText(r.remarks || "");
                    }}
                  >
                    ✏️
                  </span>
                </>
              )}
            </span>

            <span>✏️</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default AccountsReceivable;