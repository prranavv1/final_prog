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
import "../styles/PaymentSummary.css";

const data = [
  { month: "Apr'25", received: 10000000, progress: 300000, pending: 200000 },
  { month: "May'25", received: 9800000, progress: 800000, pending: 400000 },
  { month: "Jun'25", received: 8000000, progress: 900000, pending: 600000 },
  { month: "Jul'25", received: 10500000, progress: 700000, pending: 900000 },
  { month: "Aug'25", received: 12800000, progress: 900000, pending: 1300000 },
  { month: "Sep'25", received: 12000000, progress: 1400000, pending: 1700000 },
  { month: "Oct'25", received: 10800000, progress: 2400000, pending: 2100000 },
  { month: "Nov'25", received: 8900000, progress: 3400000, pending: 2500000 },
  { month: "Dec'25", received: 7000000, progress: 5500000, pending: 3300000 },
];

function PaymentSummary() {
  return (
  <div className="ps-page">

    {/* Grey Header */}
    <div className="ps-header">
      <div>
        <h2>PAYMENT SUMMARY REPORT</h2>
        <p>Manage and track your engineering workflows.</p>
      </div>

      <div className="ps-year">
        <label>FISCAL YEAR</label>
        <select>
          <option>2025</option>
          <option>2024</option>
        </select>
      </div>
    </div>

    {/* Stat Cards */}
    <div className="ps-cards">
      <div className="ps-card">
        <span>PAYMENT RECEIVED</span>
        <h3>₹ 8,45,20,000</h3>
      </div>

      <div className="ps-card">
        <span>PAYMENT INVOICED</span>
        <h3>₹ 2,10,30,000</h3>
      </div>

      <div className="ps-card danger">
        <span>INVOICE PENDING</span>
        <h3>₹ 1,46,06,943</h3>
      </div>

      <div className="ps-card dark">
        <span>REVENUE YTD</span>
        <h3>₹ 12,01,56,943</h3>
      </div>
    </div>

    {/* Chart Card */}
    <div className="ps-chart-card">
      <h3>FINANCIAL COLLECTIONS OVERVIEW</h3>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="received" fill="#19b87e" name="Payment Received" />
          <Bar dataKey="progress" fill="#3b82f6" name="In Progress" />
          <Bar dataKey="pending" fill="#f59e0b" name="Invoice Pending" />
        </BarChart>
      </ResponsiveContainer>
    </div>

  </div>
);
}

export default PaymentSummary;
