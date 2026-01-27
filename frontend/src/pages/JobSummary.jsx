import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/JobSummary.css";

const data = [
  { month: "Apr'25", started: 12, completed: 12, progress: 0 },
  { month: "May'25", started: 15, completed: 15, progress: 0 },
  { month: "Jun'25", started: 14, completed: 14, progress: 0 },
  { month: "Jul'25", started: 16, completed: 16, progress: 0 },
  { month: "Aug'25", started: 17, completed: 17, progress: 0 },
  { month: "Sep'25", started: 18, completed: 18, progress: 0 },
  { month: "Oct'25", started: 17, completed: 17, progress: 0 },
  { month: "Nov'25", started: 18, completed: 15, progress: 3 },
  { month: "Dec'25", started: 20, completed: 15, progress: 5 },
];

function JobSummary() {
  return (
    <div className="js-page">

      {/* Page Header */}
      <div className="js-header">
        <h2>JOB SUMMARY REPORT</h2>
        <p>Manage and track your engineering workflows.</p>
      </div>

      {/* Stats + Filter */}
      <div className="js-top-row">
        <div className="js-stat-card">
          <span>TOTAL JOBS</span>
          <h3>147</h3>
        </div>

        <div className="js-stat-card">
          <span>COMPLETED JOBS</span>
          <h3 className="green">139</h3>
        </div>

        <div className="js-filter">
          <label>START YEAR</label>
          <select>
            <option>2025</option>
            <option>2024</option>
          </select>
        </div>
      </div>

      {/* White Card */}
      <div className="js-card">
        <h3>JOB PERFORMANCE (APR'25 - DEC'25)</h3>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="started" fill="#1f5d7a" name="Jobs Started" />
            <Bar dataKey="completed" fill="#19c37d" name="Jobs Completed" />
            <Bar dataKey="progress" fill="#f59e0b" name="In-Progress" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default JobSummary;
