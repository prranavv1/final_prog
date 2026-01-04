import React from "react";
import "../styles/UpdateJob.css";

function UpdateJob() {
  return (
    <div className="updatejob-container">
      <h2 className="updatejob-title">Update Job</h2>

      <div className="updatejob-form">
        <div className="field">
          <label>Job No *</label>
          <input placeholder="With Button" />
        </div>

        <div className="field">
          <label>Customer *</label>
          <input placeholder="With Button" />
        </div>

        <div className="field">
          <label>Job Start Date *</label>
          <input type="date" />
        </div>

        <div className="field">
          <label>Job Finish Date</label>
          <input type="date" />
        </div>

        <div className="field">
          <label>Site</label>
          <input />
        </div>

        <div className="field">
          <label>State *</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Country *</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Mode of transportation *</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Lead Engineer</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Supporting Engineers</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Vehicle Details</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Driver accompanied</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Assets Carried</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Planned tests</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Power Plant Type</label>
          <input />
        </div>

        <div className="field">
          <label>Product / Service *</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Current Job Status</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Job Report Status</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Job Report Prepared by</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field">
          <label>Job Report Reviewed by</label>
          <select><option>Select option</option></select>
        </div>

        <div className="field full">
          <label>Machine & Activity</label>
          <textarea rows="3"></textarea>
        </div>

        <div className="field">
          <label>Upload Job Reports</label>
          <input type="file" />
        </div>

        <div className="field">
          <label>Upload Supporting docs/images</label>
          <input type="file" />
        </div>
      </div>

      <div className="updatejob-actions">
        <button className="cancel">Cancel</button>
        <button className="save">Save</button>
      </div>
    </div>
  );
}

export default UpdateJob;
