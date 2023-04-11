import React from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';

const ConversionChart = ({ data }) => {
  // Calculate percentage of customers who have placed an order
  const orderedCustomers = data.filter(customer => customer.monthlyCost !== undefined);
  const orderedPercentage = ((orderedCustomers.length / data.length) * 100).toFixed(2);

  const conversionData = [
    { name: 'Ordered', value: parseFloat(orderedPercentage) },
    { name: 'Not Ordered', value: parseFloat(100 - orderedPercentage) }
  ];

  const COLORS = ['#32a852', '#e3f3e3'];

  return (
    
    <div
      style={{
        width: '400px',
        height: '300px',
        backgroundColor: '#e3f3e3',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        margin: '0 auto',
        marginTop: '30px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
      }}
      
    >
      <h2 style={{ textAlign: "center", color: "#555" }}>
        Conversion Rate
      </h2>
      <PieChart width={300} height={200}>
        <Pie
          dataKey="value"
          data={conversionData}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          labelLine={false}
        >
          {conversionData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          {/* Add label with percentage inside the chart */}
          <Label
            position="center"
            style={{ fontSize: '24px', fill: '#555' }}
            value={`${orderedPercentage}%`}
          />
        </Pie>
      </PieChart>
      <h5 style={{ textAlign: 'center', color: '#555', marginBottom: '0px', marginTop: '0px', fontSize: '20px' }}>
        Reservations: {orderedCustomers.length}
      </h5>
      <h5 style={{ textAlign: 'center', color: '#555', fontSize: '20px',marginTop: '5px'}}>
        Total accounts: {data.length}
      </h5>
    </div>
  );
};

export default ConversionChart;
