import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CurrentEngagements.css";

function CurrentEngagements() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div>
          <h1>DASHBOARD</h1>
          <p>Manage and track your engineering workflows.</p>
        </div>
        <button className="new-job-btn">New Job Entry</button>
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <h2>DASHBOARD</h2>
          <input
            type="text"
            placeholder="Search by Job No..."
            className="search-input"
          />
        </div>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>JOB NO.</th>
              <th>CUSTOMER / SITE</th>
              <th>LEAD ENGINEER</th>
              <th>REMARKS</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, i) => (
              <tr key={i}>
                <td className="job-link">{job.job_no}</td>
                <td>
                  <strong>{job.customer_name}</strong>
                  <div className="site-text">{job.job_site}</div>
                </td>
                <td>{job.lead_engineer || "N/A"}</td>
                <td className="pending">Pending Review</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="card-footer">SHOWING {jobs.length} ACTIVE RECORDS</div>
      </div>
    </div>
  );
}

export default CurrentEngagements;
