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
    <div className="ps-container">
      <h2 className="ps-title">Payment Summary Report</h2>

      {/* TOP FILTER + METRICS */}
      <div className="ps-top">
        <div>
          <label>Start Year</label>
          <select>
            <option>Select option</option>
            <option>2025</option>
            <option>2024</option>
          </select>
        </div>

        <div className="ps-metric">
          Payment received: <b>9,02,12,863</b>
        </div>
        <div className="ps-metric">
          Payment Invoiced: <b>1,65,73,890</b>
        </div>
        <div className="ps-metric">
          Invoice Pending: <b>1,33,70,190</b>
        </div>
        <div className="ps-metric highlight">
          Revenue YTD: <b>12,01,56,943</b>
        </div>
      </div>

      {/* CHART */}
      <div className="ps-chart">
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="received" fill="#4cd964" name="Invoice Payment received" />
            <Bar dataKey="progress" fill="#4aa3df" name="Invoice Payment in progress" />
            <Bar dataKey="pending" fill="#f5b041" name="Yet to Invoice" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PaymentSummary;
