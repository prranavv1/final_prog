import React from "react";
import "../styles/AssetSummary.css";

function AssetSummary() {
  return (
    <div className="as-container">
      <h2 className="as-title">Asset Summary Report</h2>

      {/* ASSETS IN USE */}
      <h4 className="as-subtitle">Assets in Use</h4>
      <table className="as-table">
        <thead>
          <tr>
            <th>Asset#</th>
            <th>Asset Type</th>
            <th>Job#</th>
            <th>Client</th>
            <th>Site</th>
            <th>Job Start Date</th>
            <th>Lead Engineer</th>
            <th>Job Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Empty rows for now */}
          <tr>
            <td colSpan="8">&nbsp;</td>
          </tr>
          <tr>
            <td colSpan="8">&nbsp;</td>
          </tr>
        </tbody>
      </table>

      {/* ASSETS AVAILABLE */}
      <h4 className="as-subtitle">Assets Available</h4>
      <table className="as-table">
        <thead>
          <tr>
            <th>Asset#</th>
            <th>Asset Type</th>
            <th>Available Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="3">&nbsp;</td>
          </tr>
          <tr>
            <td colSpan="3">&nbsp;</td>
          </tr>
          <tr>
            <td colSpan="3">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AssetSummary;
