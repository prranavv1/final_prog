import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import "../styles/PaymentSummary.css";

function PaymentSummary() {
  const [year, setYear] = useState(2026);
  const [chartData, setChartData] = useState([]);
  const [received, setReceived] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pending, setPending] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    fetchPaymentSummary();
  }, [year]);

  const fetchPaymentSummary = async () => {
    const res = await axios.get(`http://localhost:8000/payment-summary?year=${year}`);
    setChartData(res.data.monthly);
    setReceived(res.data.received);
    setProgress(res.data.progress);
    setPending(res.data.pending);
    setRevenue(res.data.revenue);
  };

  const pieData = [
    { name: "Received", value: received },
    { name: "In Progress", value: progress },
    { name: "Pending", value: pending },
  ];

  const COLORS = ["#10b981", "#667eea", "#f59e0b"];

  return (
    <div className="ps-page">

      {/* Page Header */}
      <div className="ps-header">
        <h2>PAYMENT SUMMARY REPORT</h2>
        <p>Track financial collections, payment status, and monitor revenue trends</p>
        <div className="ps-header-controls">
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

          {/* Financial Overview Section */}
          <div className="financial-overview-section">
            <div className="section-header">
              <span className="section-number">01</span>
              <h3>Financial Overview</h3>
            </div>
            <div className="financial-cards-grid">
              
              <div className="financial-card success">
                <div className="card-icon">✅</div>
                <div class="card-content">
                  <div className="card-label">Payment Received</div>
                  <div className="card-value">₹ {received.toLocaleString()}</div>
                  <div className="card-trend">Successfully collected</div>
                </div>
              </div>

              <div className="financial-card warning">
                <div className="card-icon">⏳</div>
                <div class="card-content">
                  <div className="card-label">Payment In Progress</div>
                  <div className="card-value">₹ {progress.toLocaleString()}</div>
                  <div className="card-trend">Processing payments</div>
                </div>
              </div>

              <div className="financial-card danger">
                <div className="card-icon">⚠️</div>
                <div class="card-content">
                  <div className="card-label">Payment Pending</div>
                  <div className="card-value">₹ {pending.toLocaleString()}</div>
                  <div className="card-trend">Requires attention</div>
                </div>
              </div>

              <div className="financial-card primary">
                <div className="card-icon">📊</div>
                <div class="card-content">
                  <div className="card-label">Total Revenue YTD</div>
                  <div className="card-value">₹ {revenue.toLocaleString()}</div>
                  <div className="card-trend">Year to date earnings</div>
                </div>
              </div>

            </div>
          </div>

          {/* Analytics Section */}
          <div className="analytics-section">
            <div className="section-header">
              <span className="section-number">02</span>
              <h3>Financial Analytics</h3>
            </div>
            
            <div className="analytics-grid">
              
              {/* Bar Chart */}
              <div className="chart-card">
                <div className="chart-header">
                  <h4>Monthly Financial Collections</h4>
                  <p>Track monthly payment receipts, progress, and pending invoices</p>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={360}>
                    <BarChart data={chartData}>
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#9ca8bc', fontSize: 12 }}
                        axisLine={{ stroke: '#3d4f6b' }}
                      />
                      <YAxis 
                        tick={{ fill: '#9ca8bc', fontSize: 12 }}
                        axisLine={{ stroke: '#3d4f6b' }}
                        tickFormatter={(value) => `₹${value.toLocaleString()}`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          background: '#2a3547', 
                          border: '1px solid #667eea', 
                          borderRadius: '8px',
                          color: '#e8edf3'
                        }}
                        formatter={(value) => [`₹${value.toLocaleString()}`, '']}
                      />
                      <Legend 
                        wrapperStyle={{ color: '#e8edf3' }}
                      />
                      <Bar 
                        dataKey="received" 
                        name="Payment Received" 
                        fill="#10b981" 
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="progress" 
                        name="Payment In Progress" 
                        fill="#667eea" 
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="pending" 
                        name="Yet to Invoice" 
                        fill="#f59e0b" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="chart-card">
                <div className="chart-header">
                  <h4>Payment Distribution</h4>
                  <p>Current breakdown of payment status across all invoices</p>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie 
                        data={pieData} 
                        dataKey="value" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={100} 
                        label={(entry) => `₹${entry.value.toLocaleString()}`}
                        labelStyle={{ fill: '#e8edf3', fontSize: 12, fontWeight: 600 }}
                      >
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={COLORS[i]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          background: '#2a3547', 
                          border: '1px solid #667eea', 
                          borderRadius: '8px',
                          color: '#e8edf3'
                        }}
                        formatter={(value) => [`₹${value.toLocaleString()}`, '']}
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
          <div className="ps-actions">
            <button className="ps-btn-refresh" onClick={fetchPaymentSummary}>
              🔄 Refresh Report
            </button>
          </div>

    </div>
  );
}

export default PaymentSummary;
