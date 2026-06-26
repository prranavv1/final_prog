import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, LabelList
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

      {/* Page Header */}
      <div className="js-header">
        <h2>JOB SUMMARY REPORT</h2>
        <p>Track job performance, completion rates, and analyze monthly trends</p>
        <div className="js-header-controls">
          <div className="filter-container">
            <label>Year</label>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>
      </div>

          {/* Statistics Section */}
          <div className="stats-section">
            <div className="section-header">
              <span className="section-number">01</span>
              <h3>Performance Overview</h3>
            </div>
            <div className="stats-grid">
              
              <div className="stat-card">
                <div className="stat-label">Total Jobs</div>
                <div className="stat-value primary">{totalJobs}</div>
                <div className="stat-trend">Active engagements</div>
              </div>

              <div className="stat-card">
                <div className="stat-label">Completed Jobs</div>
                <div className="stat-value success">{completedJobs}</div>
                <div className="stat-trend">Successfully delivered</div>
              </div>

              <div className="stat-card wide">
                <div className="stat-label">Completion Rate</div>
                <div className="stat-value primary">{completionRate}%</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
                <div className="stat-trend">Overall efficiency metric</div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            <div className="section-header">
              <span className="section-number">02</span>
              <h3>Analytics & Insights</h3>
            </div>
            
            <div className="charts-grid">
              
              {/* Bar Chart */}
              <div className="chart-card">
                <div className="chart-header">
                  <h4>Monthly Job Performance</h4>
                  <p>Track job starts, completions, and progress trends</p>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData}>
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#9ca8bc', fontSize: 12 }}
                        axisLine={{ stroke: '#3d4f6b' }}
                      />
                      <YAxis 
                        tick={{ fill: '#9ca8bc', fontSize: 12 }}
                        axisLine={{ stroke: '#3d4f6b' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          background: '#2a3547', 
                          border: '1px solid #667eea', 
                          borderRadius: '8px',
                          color: '#e8edf3'
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="started" fill="#667eea" name="Started" radius={[4, 4, 0, 0]}>
                        <LabelList dataKey="started" position="inside" fill="#FFFFFF" fontSize={11} />
                      </Bar>
                      <Bar dataKey="completed" fill="#10b981" name="Completed" radius={[4, 4, 0, 0]}>
                        <LabelList dataKey="completed" position="inside" fill="#FFFFFF" fontSize={11} />
                      </Bar>
                      <Bar dataKey="progress" fill="#f59e0b" name="In Progress" radius={[4, 4, 0, 0]}>
                        <LabelList dataKey="progress" position="inside" fill="#FFFFFF" fontSize={11} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="chart-card">
                <div className="chart-header">
                  <h4>Job Status Distribution</h4>
                  <p>Current breakdown of job completion status</p>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={(entry) => `${entry.name}: ${entry.value}`}
                        labelStyle={{ fill: '#e8edf3', fontSize: 12, fontWeight: 600 }}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          background: '#2a3547', 
                          border: '1px solid #667eea', 
                          borderRadius: '8px',
                          color: '#e8edf3'
                        }} 
                      />
                      <Legend 
                        wrapperStyle={{ color: '#e8edf3' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="js-actions">
            <button className="js-btn-refresh" onClick={fetchSummary}>
              🔄 Refresh Report
            </button>
          </div>

    </div>
  );
}

export default JobSummary;
