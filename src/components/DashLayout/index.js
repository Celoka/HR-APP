import React, { useContext, useState } from 'react';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js';
import { Calendar, momentLocalizer } from 'react-big-calendar';
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

  const getEvents = () => {
    return [
      {
        title: 'Meeting 1',
        start: new Date(2023, 7, 25, 10, 0),
        end: new Date(2023, 7, 25, 11, 0),
      },
      {
        title: 'Meeting 2',
        start: new Date(2023, 7, 26, 14, 0),
        end: new Date(2023, 7, 26, 15, 0),
      },
      // Add more events here
    ];
  };

  const localizer = momentLocalizer(moment);
  const [events] = useState(getEvents());

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
            <div className="dashLayout__down-one">
              <img src="/old-woman.jpeg" />
              <div className="dashLayout__down-divv">
                <h2>Vio D. Primadona</h2>
                <p>UL Designer</p>
                <p>Full time - Remote</p>
                <p>103 tasks finished this month</p>
              </div>
            </div>

            <div className="dashLayout__down-one">
              <img src="/man.png" style={{ width: '200px'}} />
              <div className="dashLayout__down-divv">
                <h2>Opet Gaming</h2>
                <p>UL Designer</p>
                <p>Full time - Remote</p>
                <p>103 tasks finished this month</p>
              </div>
            </div>
          </div>
        </main>
      </main>
      <main className="dashLayout__first-two">
        <h1 className="dashLayout__sche">Upcoming Schedule</h1>
        <Calendar
          localizer={localizer}
          events={events}
          views={['month', 'work_week', 'agenda']}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />

        <h1>Working Type</h1>

        <div className="">
          <p>73%</p>
        </div>

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