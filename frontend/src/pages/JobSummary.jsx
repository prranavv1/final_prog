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
    <div className="js-container">
      <h2 className="js-title">Job Summary Report</h2>

      {/* TOP FILTER + COUNTS */}
      <div className="js-top">
        <div>
          <label>Start Year</label>
          <select>
            <option>Select option</option>
            <option>2025</option>
            <option>2024</option>
          </select>
        </div>

        <div className="js-count">Total Jobs : <b>147</b></div>
        <div className="js-count">Completed Jobs : <b>139</b></div>
      </div>

      {/* CHART */}
      <div className="js-chart">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="started" fill="#1f5d7a" name="Jobs Started" />
            <Bar dataKey="completed" fill="#7bdc8c" name="Jobs Completed" />
            <Bar dataKey="progress" fill="#f4b183" name="In progress" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default JobSummary;
