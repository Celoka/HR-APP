import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
//import Registration from './components/Registration';
//import Dashboard from './components/Dashboard'
import EmployeeList from './components/EmployeeList';
import Dashboards from './/components/Dashboards'

import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboards />} />
        <Route path="/employees" element={<EmployeeList />} />
      </Routes>
    </>
  );
};

export default App;
