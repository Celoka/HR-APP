import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js';
import Button from 'react-bootstrap/Button';
import { UserDetails, toastProperty, success } from '../../Data';
import TimeOffStatistics from '../TimeOffStatistics';

import './index.scss';

const analytics = [
  {
    name: 'Total employees',
    total: 1409,
    per: '23%',
    summary: '13 applications need review'
  },
  {
    name: 'Total overtime',
    total: 569,
    per: '13%',
    summary: '103 overtime schedules need approval'
  },
  {
    name: 'Total leave',
    total: 103,
    per: '3%',
    summary: '98 paid leave plans needs approval'
  },
];

const DashLayout = ({ currentScreen }) => {
  const user = useContext(UserDetails);
  const navigate = useNavigate();

  const handleLogout = () => {
    Toastify({
      text: "Logout was successful",
      ...toastProperty,
      style: success
    }).showToast();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    user.setUserDetails({});
    user.setTokenItem()
    navigate('/login');
  };

  const DashboardContent = () => (
    <section className="dashLayout__first">
      <main className="dashLayout__first-main">
        <div className="dashLayout__div">
          <h1 className='dashLayout__title'> 
            Summary
          </h1>
          < button className="dashLayout__button">Export Data</button>
        </div>
        <div className="dashLayout__items">
          {
            analytics.map((analytic) => (
              <div  className="dashLayout__item">
                <div className="dashLayout__item-cover">
                  <p>{analytic.name}</p>
                  <div className="dashLayout__item-content">
                    <h1>{analytic.total}</h1>
                    <p>{analytic.per}</p>
                  </div>
                </div>
                <div className="dashLayout__item-descr">
                  <p>
                    {analytic.summary}
                  </p>
                </div>
              </div>
            ))
          }
        </div>

        <main className="dashLayout__down">
          <div className="dashLayout__down-div1">
            <h1 className="dashLayout__down-h1">Time Off Statistics</h1>
            <div className="dashLayout__down-p">
              <span className="dashLayout__dot-cover">
                <div className="dashLayout__dot"/>
                <p> Sick leave</p>
              </span>
              <span className="dashLayout__dot-cover">
                <div className="dashLayout__dot" style={{ background: '#FFD459'}}/>
                <p>Paid leave</p>
              </span>
              <span 
                className="dashLayout__dot-cover">
                <div className="dashLayout__dot" style={{ background: '#DC146C'}}/>
                <p>Unpaid leave</p>
              </span>
            </div>
            <TimeOffStatistics />
          </div>

          <div className="dashLayout__down-div2">
            <h1  className="dashLayout__down-h1">Employee Ranks</h1>
          </div>

        </main>


      </main>
      <main className="dashLayout__first-two">
        <h1>Upcoming Schedule</h1>
      </main>
    </section>
  );

  const screenObject = {
    Dashboard: <DashboardContent />
  };

  return (
    <div className="dashLayout">
      <div className="dashLayout__log">
        <h1 className="dashLayout__current">{currentScreen}</h1>
        <div className="dashLayout__log-div">
          <p>{`${user.userDetails.firstName} ${user.userDetails.lastName}`}</p>
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