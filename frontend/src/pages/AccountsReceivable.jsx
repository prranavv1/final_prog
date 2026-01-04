import React from "react";
import "../styles/AccountsReceivable.css";

function AccountsReceivable() {
  return (
    <div className="ar-container">
      <div className="ar-header">
        <h2>Account Receivable</h2>
        <h3>Total Amount : 21,43,976</h3>
      </div>

      <table className="ar-table">
        <thead>
          <tr>
            <th>Job#</th>
            <th>Invoice#</th>
            <th>Client</th>
            <th>Invoice Amount</th>
            <th>Site</th>
            <th>Job Finish Date</th>
            <th>Invoice Date</th>
            <th>Due Date</th>
            <th>Invoice Age</th>
            <th>Remarks</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>2025187</td>
            <td>PROG/2024/086</td>
            <td>GE</td>
            <td>12,35,000</td>
            <td>Jamnagar, India</td>
            <td>22/12/2024</td>
            <td>16/01/2025</td>
            <td>16/03/2025</td>
            <td>87</td>
            <td>✏️</td>
          </tr>

          <tr>
            <td>2025195</td>
            <td>PROG/2024/124</td>
            <td>ONGC</td>
            <td>9,08,976</td>
            <td>Assam</td>
            <td>24/12/2024</td>
            <td>19/01/2025</td>
            <td>19/03/2025</td>
            <td>84</td>
            <td>✏️</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AccountsReceivable;
