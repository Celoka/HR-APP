import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js';
import Button from 'react-bootstrap/Button';
import { UserDetails, toastProperty, success } from '../../Data';
import './index.scss';

const DashLayout = ({ currentScreen }) => {
  const user = useContext(UserDetails);
  const navigate = useNavigate();

  const handleLogout = () => {
    Toastify({
      text: "Login was successful",
      ...toastProperty,
      style: success
    }).showToast();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const DashboardContent = () => (
    <div className="dashLayout__first">
      <h1 className='dashLayout__title'> 
        Summary
      </h1>
    < button className="dashLayout__button">Export Data</button>
    </div>
  );

  const screenObject = {
    dashboard: <DashboardContent />
  }

  return (
    <div className="dashLayout">
      <div className="dashLayout__log">
        <h1 className="dashLayout__current">{currentScreen}</h1>
        <div className="dashLayout__log-div">
          <p>{`${user.firstName} ${user.lastName}`}</p>
          <Button 
            variant="outline-danger"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
        {screenObject[currentScreen]}
    </div>
  )
};

export default DashLayout;