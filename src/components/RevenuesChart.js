import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const RevenuesChart = ({ data }) => {
  const [selectedRange, setSelectedRange] = useState({ start: 0, end: 11 });

  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const handleRangeChange = (start, end) => {
    setSelectedRange({ start, end });
  };

  const revenuesData = data.reduce((acc, customer) => {
    const { pickupDate, returnDate, monthlyCost } = customer;

    if (pickupDate && returnDate && monthlyCost) {
      const pickupMonth = new Date(pickupDate).getMonth();
      const returnMonth = new Date(returnDate).getMonth();

      if (pickupMonth <= selectedRange.end && returnMonth >= selectedRange.start) {
        const start = Math.max(pickupMonth, selectedRange.start);
        const end = Math.min(returnMonth, selectedRange.end);

        for (let month = start; month <= end; month++) {
          const monthName = allMonths[month];
          const monthData = acc.find((monthData) => monthData.month === monthName);
          if (monthData) {
            monthData.revenue += monthlyCost;
          } else {
            acc.push({ month: monthName, revenue: monthlyCost });
          }
        }
      }
    }
    return acc;
  }, []).sort((a, b) => allMonths.indexOf(a.month) - allMonths.indexOf(b.month)); // Sort the data by month index

  return (
    <div
      style={{
        width: "400px",
        height: "300px",
        backgroundColor: "#e3f3e3", // Muted green color
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        marginTop: '40px',
        margin: "0 auto", // Center the component
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', // Add box shadow
      }}
    >
      <h2 style={{ textAlign: "center", color: "#555" }}>
        Monthly Revenues
      </h2>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <label htmlFor="startMonth" style={{ color: "#555", marginRight: "10px" }}>
          Start Month:
        </label>
        <select
          id="startMonth"
          value={selectedRange.start}
          onChange={(e) => handleRangeChange(parseInt(e.target.value), selectedRange.end)}
        >
          {allMonths.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <label htmlFor="endMonth" style={{ color: "#555", marginRight: "10px",marginLeft: "10px" }}>
          End Month:
        </label>
        <select
          id="endMonth"
          value={selectedRange.end}
          onChange={(e) => handleRangeChange(selectedRange.start, parseInt(e.target.value))}
        >
          {allMonths.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        
      </div>
      <div style={{ marginTop: "20px" }}>
        <BarChart width={300} height={200} data={revenuesData}>
          <XAxis dataKey = "month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#32a852" />
        </BarChart>
      </div>
      <h5 style={{ textAlign: "center", color: "#555", marginBottom: "20px" }}>
        Month is not displayed if no revenue is obtained.
      </h5>
    </div>
  );
};
export default RevenuesChart;
