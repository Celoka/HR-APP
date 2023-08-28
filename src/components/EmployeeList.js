// EmployeeListPage.js

import React, { useState, useEffect } from 'react';
//import './EmployeeListPage.css'; // Import your CSS for styling

const EmployeeListPage = () => {
  // Dummy employee data
  const dummyEmployees = [
    {
      id: 1,
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      photoUrl: 'https://placekitten.com/100/100', // Use placeholder images
    },
    {
      id: 2,
      name: 'Jane',
      surname: 'Smith',
      email: 'jane.smith@example.com',
      photoUrl: 'https://placekitten.com/100/100',
    },
    // Add more dummy employees as needed
  ];

  // State for storing the list of employees and search query
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to fetch the list of employees (dummy data)
  const fetchEmployees = () => {
    // Simulate an API call by setting the state with the dummy data
    setEmployees(dummyEmployees);
  };

  useEffect(() => {
    // Fetch the list of employees when the component mounts
    fetchEmployees();
  }, []);

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter employees based on search query
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to navigate to the employee details page
  const navigateToEmployeeDetails = () => {
    // Implement the navigation logic to the employee details page
    // You can use a routing library like React Router for this
  };

  return (
    <div>
      <h1>Employee List</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="employee-list">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="employee-card">
            <div className="employee-info">
              <img src={employee.photoUrl} alt={employee.name} />
              <div className="employee-details">
                <p>{employee.name}</p>
                <p>{employee.surname}</p>
              </div>
            </div>
            <button onClick={() => navigateToEmployeeDetails(employee.id)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeListPage;
