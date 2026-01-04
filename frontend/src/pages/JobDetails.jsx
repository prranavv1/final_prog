import React from "react";
import "../styles/JobDetailReport.css"; // keep same CSS file

function JobDetails() {
  return (
    <div className="jdr-container">
      <h2 className="jdr-title">Job Details</h2>

      {/* FILTERS */}
      <div className="jdr-filters">
        <div>
          <label>Start Date</label>
          <input type="date" />
        </div>

        <div>
          <label>End Date</label>
          <input type="date" />
        </div>

        <div>
          <label>Invoice Payment Status</label>
          <select>
            <option>Select option</option>
            <option>Payment Done</option>
            <option>Awaiting Payment</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <table className="jdr-table">
        <thead>
          <tr>
            <th>Job#</th>
            <th>Invoice#</th>
            <th>Client</th>
            <th>Site</th>
            <th>Job Finish Date</th>
            <th>Invoice Date</th>
            <th>Invoice/Quote Amount</th>
            <th>Due Date</th>
            <th>Payment Date</th>
            <th>Invoice Payment Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>2025187</td>
            <td>PROG/2024/086</td>
            <td>GE</td>
            <td>Jamnagar, India</td>
            <td>22/12/2024</td>
            <td>16/01/2025</td>
            <td>12,35,000</td>
            <td>16/03/2025</td>
            <td>24/02/2025</td>
            <td>Payment Done</td>
          </tr>

          <tr>
            <td>2025195</td>
            <td>PROG/2024/124</td>
            <td>ONGG</td>
            <td>Assam</td>
            <td>24/12/2024</td>
            <td>19/01/2025</td>
            <td>9,08,976</td>
            <td>19/03/2025</td>
            <td>-</td>
            <td>Awaiting Payment</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default JobDetails;
