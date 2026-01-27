import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/JobDetails.css";



function JobDetails() {
  const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [status, setStatus] = useState("");
  const [jobDetails, setJobDetails] = useState([]);

useEffect(() => {
  axios.get("http://localhost:8000/job-details")
    .then(res => setJobDetails(res.data))
    .catch(err => console.error(err));
}, []);
const filteredJobs = jobDetails.filter((j) => {
  let match = true;

  if (startDate) {
    match = match && new Date(j.invoice_date) >= new Date(startDate);
  }

  if (endDate) {
    match = match && new Date(j.invoice_date) <= new Date(endDate);
  }

  if (status) {
    match = match && j.status === status;
  }

  return match;
});

  return (
  <div className="jdr-page">

    {/* Page Header */}
    <div className="jdr-header">
      <h1>JOB DETAIL REPORT</h1>
      <p>Manage and track your engineering workflows.</p>
    </div>

    {/* White Card */}
    <div className="jdr-card">

      {/* Filter Box */}
      <div className="jdr-filter-box">
        <div>
          <label>START DATE</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>

        <div>
          <label>END DATE</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>

        <div>
          <label>INVOICE PAYMENT STATUS</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Payment Done">Payment Done</option>
            <option value="Awaiting Payment">Awaiting Payment</option>
          </select>
        </div>

        
      </div>

      {/* Table */}
      <div className="jdr-table-wrapper">
        <table className="jdr-table">
          <thead>
            <tr>
              <th>JOB#</th>
              <th>INVOICE#</th>
              <th>CLIENT</th>
              <th>SITE</th>
              <th>JOB FINISH DATE</th>
              <th>INVOICE DATE</th>
              <th>INVOICE / QUOTE AMOUNT</th>
              <th>DUE DATE</th>
              <th>PAYMENT DATE</th>
              <th>INVOICE STATUS</th>
            </tr>
          </thead>

          <tbody>
            {filteredJobs.map((j, index) => (
              <tr key={index}>
                <td className="job-link">{j.job_no}</td>
                <td>{j.invoice_no}</td>
                <td className="client">{j.client}</td>
                <td>{j.site}</td>
                <td>{j.job_finish_date}</td>
                <td>{j.invoice_date}</td>
                <td>${j.amount?.toLocaleString()}</td>
                <td className="danger">{j.due_date}</td>
                <td>{j.payment_date || "-"}</td>
                <td>{j.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  </div>
);

}

export default JobDetails;
