import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PendingInvoice.css";

function PendingInvoice() {
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [editingId, setEditingId] = useState(null);
const [remarkText, setRemarkText] = useState("");

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
    console.error(err);
    alert("Failed to save remarks");
  }
};

  const fetchPendingInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:8000/pending-invoices");
      setPendingInvoices(res.data.rows);
      setTotalAmount(res.data.total_amount);
    } catch (err) {
      console.error("Failed to load pending invoices", err);
    }
  };

  useEffect(() => {
    fetchPendingInvoices();
  }, []);

  return (
    
  <div className="pi-page">

    {/* Page Title */}
    <div className="pi-page-header">
      <h1>PENDING</h1>
      <p>Manage and track your engineering workflows.</p>
    </div>

    {/* White Card */}
    <div className="pi-card">

      {/* Card Header */}
      <div className="pi-card-header">
        <div>
          <h2>PENDING INVOICES LEDGER</h2>
          <p>Real-time financial tracking</p>
        </div>

        <div className="pi-total-box">
          <span>TOTAL OUTSTANDING</span>
          <h3>{totalAmount.toLocaleString()}</h3>
        </div>
      </div>

      {/* Table */}
      <div className="pi-table-wrapper">
        <div className="pi-table-header">
          <span>JOB #</span>
          <span>CLIENT</span>
          <span>SITE</span>
          <span>QUOTE AMT</span>
          <span>JOB FINISH</span>
          <span>REPORT FIN</span>
          <span>PENDING (DAYS)</span>
          <span>REMARKS</span>
          <span>ACTION</span>
        </div>

        {pendingInvoices.map((p) => (
          <div className="pi-row" key={p.id}>
            <span className="job-link">{p.job_no}</span>
            <span className="client">{p.client}</span>
            <span>{p.site}</span>
            <span>{p.quote_amount?.toLocaleString()}</span>
            <span>{p.job_finish_date}</span>
            <span>{p.report_finish_date || "-"}</span>

            <span className={`age ${p.invoicing_pending > 3 ? "danger" : ""}`}>
              {p.invoicing_pending}
            </span>

            <span className="remarks">
              {editingId === p.id ? (
                <>
                  <input
                    value={remarkText}
                    onChange={(e) => setRemarkText(e.target.value)}
                  />
                  <button onClick={() => saveRemarks(p.id)}>Save</button>
                </>
              ) : (
                <>
                  {p.remarks || "Add remark"}
                  <span
                    className="edit-icon"
                    onClick={() => {
                      setEditingId(p.id);
                      setRemarkText(p.remarks || "");
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

export default PendingInvoice;
