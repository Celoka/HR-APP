import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard'
import EmployeeList from './components/EmployeeList';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeList />} />
      </Routes>
    </>
  );
};

export default App;
