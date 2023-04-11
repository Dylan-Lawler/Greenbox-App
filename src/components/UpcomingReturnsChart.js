import React from 'react';

const UpcomingReturnsChart = ({ data }) => {
  const currentDate = new Date(); // Get the current date

  // Filter returns that are after the current date
  const upcomingReturns = data.filter(customer => {
    const returnDate = new Date(customer.returnDate);
    return returnDate > currentDate; // Compare with current date
  });

  // Sort upcoming returns by return date in ascending order
  upcomingReturns.sort((a, b) => new Date(a.returnDate) - new Date(b.returnDate));

  // Group upcoming returns by return date
  const returnData = upcomingReturns.reduce((acc, customer) => {
    const returnDate = new Date(customer.returnDate).toLocaleDateString();
    if (isNaN(new Date(customer.returnDate).getTime())) {
      // Skip objects with invalid dates
      return acc;
    }
    if (!acc[returnDate]) {
      acc[returnDate] = { returns: 0, items: 0 };
    }
    acc[returnDate].returns++;
    acc[returnDate].items += customer.numItems;
    return acc;
  }, {});

  // Convert grouped data into an array
  const returnsData = Object.keys(returnData).map(date => {
    return {
      date,
      returns: returnData[date].returns,
      items: returnData[date].items
    };
  });

  return (
    <div style={styles.container}>
       <h2 style={{ textAlign: 'center', color: '#555', marginBottom: '20px' }}>Upcoming Dropoffs</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th style={styles.tableHeaderCell}>Date</th>
            <th style={styles.tableHeaderCell}>Returns</th>
            <th style={styles.tableHeaderCell}>Items</th>
          </tr>
        </thead>
        <tbody>
          {returnsData.map(item => (
            <tr key={item.date} style={styles.tableRow}>
              <td style={styles.tableCell}>{item.date}</td>
              <td style={styles.tableCell}>{item.returns}</td>
              <td style={styles.tableCell}>{item.items}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  
  container: {
    backgroundColor: '#e3f3e3',
    width: '440px',
    maxHeight: '300px',
    overflowY: 'auto',
    borderRadius: '4px',
    boxShadow:'0px 2px 8px rgba(0, 0, 0, 0.1)',
    margin: '0 auto', // Add margin auto to center the div horizontally
    marginTop: '150px', // Add marginTop to center the div vertically
    transform: 'translateY(-50%)', // Add translateY with -50% to adjust vertical alignment
    position: 'relative' // Add position relative to allow vertical alignment
  },
  table: {
    color:'#555',
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#e3f3e3',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  tableHeaderRow: {
    backgroundColor: '#e3f3e4',
  },
  tableHeaderCell: {
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'center',
  },
};

export default UpcomingReturnsChart;
