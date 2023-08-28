import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import TimeOffStatistics from './TimeOffStatistics';
//import '../component-designs/Dashboard.css';


const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
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

  useEffect(() => {
    // Fetch data or perform any other side effects here
  }, []); // Add dependencies as needed


  return (
    <div className="dashboard-container">
      <button
        className={`hamburger ${sidebarVisible ? 'hamburger-open' : ''}`}
        onClick={toggleSidebar}
      >
        <i className={`fa ${sidebarVisible ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
      <div className={`sidebar ${sidebarVisible ? 'sidebar-open' : ''}`}>
        <button
          className={`close-btn ${sidebarVisible ? '' : 'sidebar-close'}`}
          onClick={toggleSidebar}
        >
          <i className="fa fa-times"></i>
        </button>
        <ul>
          <li>
            <a href="https://web.com" className="active">
              <i className="fa fa-dashboard"></i>Dashboard
            </a>
          </li>
          <li>
            <Link className="button custom-align-item" to="/employees">
              <i className="fa fa-user"></i>Employee
            </Link>
          </li>
        </ul>
      </div>
      <div className="main">
        <div className="header">
          <h2>Summary</h2>
          <div className="export-data">Export Data</div>
        </div>

        <div className="cards-container">
          <div className="cards-container">
            <div className="card">
              <div className="card-content">
                <p>Total Employees</p>
                <h1>100</h1>
                <p>employees</p>
              </div>
              <div className="card-description">
                <section>
                  Description of Total Employees Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Nulla vitae magna nec sapien
                  pharetra venenatis eu a elit. Sed eu justo et quam dapibus
                  luctus.
                </section>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <p>Total Overtime</p>
                <h1>50</h1>
                <p>hours</p>
              </div>
              <div className="card-description">
                <section>
                  Description of Total Overtime Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Nulla vitae magna nec sapien
                  pharetra venenatis eu a elit. Sed eu justo et quam dapibus
                  luctus.
                </section>
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                <p>Total Leave</p>
                <h1>20</h1>
                <p>days</p>
              </div>
              <div className="card-description">
                <section>
                  Description of Total Leave Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Nulla vitae magna nec sapien
                  pharetra venenatis eu a elit. Sed eu justo et quam dapibus
                  luctus.
                </section>
              </div>
            </div>
          </div>
        </div>
        <TimeOffStatistics />
      </div>
      <div className="upcoming-schedule">
        <h2>Upcoming Schedule</h2>
        <Calendar
          localizer={localizer}
          events={events}
          views={['month', 'work_week', 'agenda']}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
        <div className="event-cards">
          {/* Display event cards for the selected day here */}
          Hello
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
