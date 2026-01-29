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

  const COLORS = ["#19b87e", "#3b82f6", "#f59e0b"];

  return (
    <div className="ps-page">

      {/* Header */}
      <div className="ps-header">
        <div>
          <h2>PAYMENT SUMMARY REPORT</h2>
        </div>

        <div className="ps-year">
          <label>YEAR</label>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="ps-cards">
        <div className="ps-card">
          <span>PAYMENT RECEIVED</span>
          <h3>₹ {received.toLocaleString()}</h3>
        </div>

        <div className="ps-card">
          <span>PAYMENT IN PROGRESS</span>
          <h3>₹ {progress.toLocaleString()}</h3>
        </div>

        <div className="ps-card danger">
          <span>PAYMENT PENDING</span>
          <h3>₹ {pending.toLocaleString()}</h3>
        </div>

        <div className="ps-card dark">
          <span>REVENUE YTD</span>
          <h3>₹ {revenue.toLocaleString()}</h3>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="ps-chart-card">
        <h3>FINANCIAL COLLECTIONS OVERVIEW</h3>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="received" fill="#19b87e" />
            <Bar dataKey="progress" fill="#3b82f6" />
            <Bar dataKey="pending" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="ps-chart-card" style={{ marginTop: "30px" }}>
        <h3>PAYMENT DISTRIBUTION</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
              {pieData.map((entry, i) => (
                <Cell key={i} fill={COLORS[i]} />
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

export default PaymentSummary;
