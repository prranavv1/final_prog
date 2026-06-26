import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CurrentEngagements.css";
import { useNavigate } from "react-router-dom";

function CurrentEngagements() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.job_no.toString().includes(search) ||
    job.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
    job.job_site?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ce-page">

      {/* Page Header */}
      <div className="ce-header">
        <h2>CURRENT ENGAGEMENTS</h2>
    
        <button 
          className="new-job-btn"
          onClick={() => navigate('/new-job')}
        >
          <span>➕</span>
          New Job Entry
        </button>
      </div>

      {/* Search & Overview Card */}
      <div className="ce-card">
        <h4>SEARCH & OVERVIEW</h4>
        
        <div className="search-stats-container">
          {/* Search Bar */}
          <div className="search-section">
            <input
              type="text"
              placeholder="Search by job number, customer, or site..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          {/* Stats Summary */}
          <div className="stats-section">
            <div className="stat-card">
              <span className="stat-label">TOTAL JOBS</span>
              <span className="stat-value">{jobs.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">SEARCH RESULTS</span>
              <span className="stat-value">{filteredJobs.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Jobs Listing Card */}
      <div className="ce-card">
        <h4>ACTIVE JOBS LISTING</h4>
        
        <table className="ce-table">
          <thead>
            <tr>
              <th>JOB#</th>
              <th>CUSTOMER</th>
              <th>SITE LOCATION</th>
              <th>LEAD ENGINEER</th>
              <th>JOB STATUS</th>
              <th>REPORT STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, i) => (
                <tr key={i}>
                  <td>
                    <b 
                      className="job-link"
                      onClick={() => navigate(`/update-job/${job.job_no}`)}
                    >
                      {job.job_no}
                    </b>
                  </td>
                  <td>{job.customer_name}</td>
                  <td>{job.job_site || "—"}</td>
                  <td>{job.lead_engineer || "Not Assigned"}</td>
                  <td>
                    <span className={`status-pill ${getStatusClass(job.job_work_status)}`}>
                      {job.job_work_status || "Pending"}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${getReportStatusClass(job.job_report_status)}`}>
                      {job.job_report_status || "Not Started"}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn view"
                        onClick={() => navigate(`/update-job/${job.job_no}`)}
                        title="View/Edit Job"
                      >
                        👁️
                      </button>
                      <button 
                        className="action-btn financials"
                        onClick={() => navigate(`/job-financials`)}
                        title="View Financials"
                      >
                        💰
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  <div className="no-data-message">
                    <span>📋</span>
                    <p>No jobs found matching your search criteria</p>
                    <small>Try adjusting your search terms or browse all jobs</small>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Table Footer */}
        {filteredJobs.length > 0 && (
          <div className="table-summary">
            Displaying <strong>{filteredJobs.length}</strong> of <strong>{jobs.length}</strong> total jobs
          </div>
        )}
      </div>

    </div>
  );
}

// Helper functions for status styling
function getStatusClass(status) {
  if (!status) return 'pending';
  const statusLower = status.toLowerCase();
  if (statusLower.includes('completed')) return 'success';
  if (statusLower.includes('progress') || statusLower.includes('ongoing')) return 'warning';
  return 'pending';
}

function getReportStatusClass(status) {
  if (!status) return 'pending';
  const statusLower = status.toLowerCase();
  if (statusLower.includes('completed')) return 'success';
  if (statusLower.includes('progress') || statusLower.includes('review')) return 'warning';
  return 'pending';
}

export default CurrentEngagements;
