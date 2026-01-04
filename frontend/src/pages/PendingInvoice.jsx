import React from "react";
import "../styles/PendingInvoice.css";

function PendingInvoice() {
  return (
    <div className="pi-container">
      <div className="pi-header">
        <h2>Pending Invoice</h2>
        <h3>Total Amount : 21,43,976</h3>
      </div>

      <table className="pi-table">
        <thead>
          <tr>
            <th>Job#</th>
            <th>Client</th>
            <th>Site</th>
            <th>Quote Amount</th>
            <th>Job Finish Date</th>
            <th>Report Finish Date</th>
            <th>Invoicing pending</th>
            <th>Remarks</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>2025187</td>
            <td>GE</td>
            <td>Jamnagar, India</td>
            <td>12,35,000</td>
            <td>22/12/2024</td>
            <td>16/01/2025</td>
            <td>23</td>
            <td>✏️</td>
          </tr>

          <tr>
            <td>2025195</td>
            <td>ONGG</td>
            <td>Assam</td>
            <td>9,08,976</td>
            <td>24/12/2024</td>
            <td>19/01/2025</td>
            <td>45</td>
            <td>✏️</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PendingInvoice;
