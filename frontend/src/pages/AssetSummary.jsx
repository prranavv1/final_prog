import React from "react";
import "../styles/AssetSummary.css";

function AssetSummary() {
  return (
    <div className="as-page">

      {/* Page Header */}
      <div className="as-header">
        <h2>ASSET SUMMARY REPORT</h2>
        <p>Manage and track your engineering workflows.</p>
      </div>

      {/* Registry A */}
      <div className="as-card">
        <h4>REGISTRY A : ASSETS IN USE</h4>

        <table className="as-table">
          <thead>
            <tr>
              <th>ASSET#</th>
              <th>ASSET TYPE</th>
              <th>JOB#</th>
              <th>CLIENT</th>
              <th>SITE</th>
              <th>JOB START DATE</th>
              <th>LEAD ENGINEER</th>
              <th>JOB STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>AST-992</b></td>
              <td>Thermal Camera</td>
              <td className="job-link">JOB-2401</td>
              <td>Apex Heavy</td>
              <td>Site A</td>
              <td>2025-01-10</td>
              <td>J. Reynolds</td>
              <td>
                <span className="status-pill">In-Progress</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Registry B */}
      <div className="as-card small">
        <h4>REGISTRY B : ASSETS AVAILABLE</h4>

        <table className="as-table">
          <thead>
            <tr>
              <th>ASSET#</th>
              <th>ASSET TYPE</th>
              <th>AVAILABLE LOCATION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>AST-104</b></td>
              <td>Vibration Analyzer</td>
              <td>Main Warehouse / Rack 4</td>
            </tr>
            <tr>
              <td><b>AST-205</b></td>
              <td>Oil Lab Kit</td>
              <td>Service Center West</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AssetSummary;
