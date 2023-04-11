import React, { useState, useEffect } from 'react';
import RevenuesChart from './components/RevenuesChart';
import ConversionChart from './components/ConversionChart';
import UpcomingReturnsChart from './components/UpcomingReturnsChart';
import data from './customers.json';

const App = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedSchool, setSelectedSchool] = useState('All Schools');

  // Filter data based on selected school
  useEffect(() => {
    if (selectedSchool === 'All Schools') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(customer => customer.school === selectedSchool);
      setFilteredData(filtered);
    }
  }, [selectedSchool]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Greenbox Information Dashboard</h1>
      {/* School filter */}
      <div style={styles.dropdownContainer}>
        <label style={styles.dropdownLabel}>Select School:</label>
        <select
          value={selectedSchool}
          onChange={e => setSelectedSchool(e.target.value)}
          style={styles.dropdown}
        >
          <option value="All Schools">All Schools</option>
          <option value="Princeton">Princeton</option>
          <option value="Dartmouth">Dartmouth</option>
          <option value="Harvard">Harvard</option>
          <option value="Cornell">Cornell</option>
          <option value="Columbia">Columbia</option>
          <option value="Brown">Brown</option>
          <option value="Yale">Yale</option>
        </select>
      </div>

      {/* Revenues chart */}
      <RevenuesChart data={filteredData} />

      {/* Conversion chart */}
      <ConversionChart data={filteredData} />

      {/* Upcoming returns chart */}
      <UpcomingReturnsChart data={filteredData} />
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f1f1f1', // Set background color to grey
    padding: '20px', // Add padding to the container
  },
  title: {
    textAlign: 'center', // Center the title horizontally
    margin: '0', // Remove margin of h1 element
    padding: '20px 0', // Add padding to the top and bottom of the title
    color: '#555', // Set title color to #555
  },
  dropdownContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  dropdownLabel: {
    
    marginRight: '10px', // Add margin to the right for spacing
    color: '#666', // Set color for the label
    fontSize: '16px', // Set font size for the label
  },
  dropdown: {
    marginBottom: '30px',
    padding: '10px', // Add padding for spacing
    borderRadius: '5px', // Add border radius for rounded corners
    border: 'none', // Remove default border
    backgroundColor: '#fff', // Set background color to white
    color: '#333', // Set color for the dropdown text
    fontSize: '16px', // Set font size for the dropdown text
    cursor: 'pointer', // Change cursor to pointer on hover
    outline: 'none', // Remove default focus outline
    minWidth: '150px', // Set minimum width for the dropdown
    boxShadow: '0 2px 5px',
  }
};

export default App;
