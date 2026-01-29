import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

import "../styles/JobSummary.css";

function JobSummary() {
  const [year, setYear] = useState(2026);
  const [chartData, setChartData] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [completedJobs, setCompletedJobs] = useState(0);
  const completionRate =
  totalJobs === 0 ? 0 : Math.round((completedJobs / totalJobs) * 100);

const inProgressJobs = totalJobs - completedJobs;

const pieData = [
  { name: "Completed", value: completedJobs },
  { name: "In Progress", value: inProgressJobs }
];

const COLORS = ["#19c37d", "#f59e0b"];



  useEffect(() => {
    fetchSummary();
  }, [year]);

  const fetchSummary = async () => {
    const res = await axios.get(
      `http://localhost:8000/job-summary?year=${year}`
    );

    setChartData(res.data.monthly);
    setTotalJobs(res.data.total_jobs);
    setCompletedJobs(res.data.completed_jobs);
  };

  return (
  <div className="js-page">

    <div className="js-header">
      <h2>JOB SUMMARY REPORT</h2>
    </div>

    <div className="js-top-row">
      <div className="js-stat-card">
        <span>TOTAL JOBS</span>
        <h3>{totalJobs}</h3>
      </div>

      <div className="js-stat-card">
        <span>COMPLETED JOBS</span>
        <h3 className="green">{completedJobs}</h3>
      </div>

      <div className="js-stat-card wide">
        <span>COMPLETION RATE</span>
        <h3>{completionRate}%</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      <div className="js-filter">
        <label>YEAR</label>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>
    </div>

    {/* Bar Chart */}
    <div className="js-card">
      <h3>JOB PERFORMANCE</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="started" fill="#1f5d7a" name="Started" />
          <Bar dataKey="completed" fill="#19c37d" name="Completed" />
          <Bar dataKey="progress" fill="#f59e0b" name="In Progress" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Pie Chart */}
    <div className="js-card" style={{ marginTop: "30px" }}>
      <h3>JOB STATUS DISTRIBUTION</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>

  </div>
);

}

export default JobSummary;
