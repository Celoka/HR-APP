import React, { useContext, useState } from 'react';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { UserDetails, toastProperty, success } from '../../Data';
import TimeOffStatistics from '../TimeOffStatistics';
import Card from 'react-bootstrap/Card';

import './index.scss';

function DocIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 231.306 231.306"
    >
      <g>
        <path d="M229.548 67.743L163.563 1.757A6 6 0 00159.32 0H40.747C18.279 0 0 18.279 0 40.747V190.56c0 22.468 18.279 40.747 40.747 40.747H190.56c22.468 0 40.747-18.279 40.747-40.747V71.985a6.005 6.005 0 00-1.759-4.242zM164.32 19.485l47.5 47.5h-47.5v-47.5zm26.239 199.821H40.747C24.896 219.306 12 206.41 12 190.559V40.747C12 24.896 24.896 12 40.747 12H152.32v60.985a6 6 0 006 6h60.985v111.574c.001 15.851-12.895 28.747-28.746 28.747z"></path>
        <path d="M103.826 52.399c-5.867-5.867-13.667-9.098-21.964-9.098s-16.097 3.231-21.964 9.098C54.031 58.266 50.8 66.066 50.8 74.363c0 8.297 3.231 16.097 9.098 21.964l61.536 61.536c7.957 7.956 20.9 7.954 28.855 0 7.955-7.956 7.955-20.899 0-28.855L89.361 68.082a6 6 0 00-8.485 8.485l60.927 60.927c3.276 3.276 3.276 8.608 0 11.884s-8.607 3.276-11.884 0L68.383 87.843A18.937 18.937 0 0162.8 74.364c0-5.092 1.983-9.879 5.583-13.479 7.433-7.433 19.525-7.433 26.958 0l64.476 64.476c11.567 11.567 11.567 30.388 0 41.955-5.603 5.603-13.053 8.689-20.977 8.689s-15.374-3.086-20.977-8.689L68.29 117.742a6 6 0 00-8.485 8.485l49.573 49.573c7.87 7.87 18.333 12.204 29.462 12.204s21.593-4.334 29.462-12.204 12.204-18.333 12.204-29.463c0-11.129-4.334-21.593-12.204-29.462l-64.476-64.476z"></path>
      </g>
    </svg>
  );
};

const docLinks = [
  {
    name: 'Personal leave application form', 
    link: 'https://res.cloudinary.com/skybound/image/upload/v1693862473/personal_leave_application_form.pdf'
  },
  {
    name: 'Parental Leave Application_Form',
    link: 'https://res.cloudinary.com/skybound/image/upload/v1693862470/Parental_Leave_Application_Form.pdf',
  },
  {
    name: 'Vacation Leave Application Form',
    link: 'https://res.cloudinary.com/skybound/raw/upload/v1693862470/Vacation_Leave_Application_Form.doc',
  },
  {
    name: 'Sick Leave Application',
    link: 'https://res.cloudinary.com/skybound/image/upload/v1693862469/Sick_Leave_Application_Form.pdf',
  },
  {
    name: 'Annual Leave Application Form',
    link: 'https://res.cloudinary.com/skybound/image/upload/v1693862468/ANNUAL_LEAVE_APPLICATION_FORM.pdf',
  },
  {
    name: 'Leave Application Form',
    link: 'https://res.cloudinary.com/skybound/raw/upload/v1693862467/Leave_Application_Form_For_Company.doc',
  },
  {
    name: 'Vacation Leave Application Form',
    link: 'https://res.cloudinary.com/skybound/raw/upload/v1693862470/Vacation_Leave_Application_Form.doc',
  },
  {
    name: 'Vacation Leave Application Form',
    link: 'https://res.cloudinary.com/skybound/raw/upload/v1693862470/Vacation_Leave_Application_Form.doc',
  },
];

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


const employees = [
  {
    name: 'John Doe',
    totalLeave: 21,
    leaveTaken: 10,
    leaveLeft: 11,
    request: 3,
    status: 'Approved',
  },
  {
    name: 'John Doe',
    totalLeave: 21,
    leaveTaken: 10,
    leaveLeft: 11,
    request: 3,
    status: 'Pending',
  },
  {
    name: 'John Doe',
    totalLeave: 21,
    leaveTaken: 10,
    leaveLeft: 11,
    request: 3,
    status: 'Declined',
  },
  {
    name: 'John Doe',
    totalLeave: 21,
    leaveTaken: 10,
    leaveLeft: 11,
    request: 3,
    status: 'Approved',
  },
  {
    name: 'John Doe',
    totalLeave: 21,
    leaveTaken: 10,
    leaveLeft: 11,
    request: 3,
    status: 'Approved',
  },
  {
    name: 'John Doe',
    totalLeave: 21,
    leaveTaken: 10,
    leaveLeft: 11,
    request: 3,
    status: 'Approved',
  },
  {
    name: 'John Doe',
    totalLeave: 21,
    leaveTaken: 10,
    leaveLeft: 11,
    request: 3,
    status: 'Approved',
  }
]

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

  const handleApproval = (value) => {
    console.log(value)
  }

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
            analytics.map((analytic, index) => (
              <div  className="dashLayout__item" key={index}>
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

        <h1 className="dashLayout__work">Working Type</h1>
        
        <div className="dashLayout__circle-wrapper">

          <div className="dashLayout__circle">
            <div className="dashLayout__circle-item">
              <div className="dashLayout__circle-text"> 
                <p className="dashLayout__circle-p">73%</p>
                <p>(1028 people)</p>
                <p>Working from</p>
                <p>home</p>
              </div>
            </div>
          </div>

          <div className="dashLayout__circle dashLayout__circle-second">
            <div className="dashLayout__circle-item dashLayout__circle-third">
              <div className="dashLayout__circle-text"> 
                <p className="dashLayout__circle-p">73%</p>
                <p>(1028 people)</p>
                <p>Working from</p>
                <p>home</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );

  const { firstName, lastName, emailAddress, role } = user.userDetails;

  const EmployeeScreen = () => {
    return (
      <div className="dashLayout__employ">
        <h1 className="dashLayout__employ-title">Employee List</h1>
        <div>
          <table className="table__table-list">
            <thead>
              <tr>
                <th>Name</th>
                <th>Total Leave</th>
                <th>Leave Left</th>
                <th>Leave Taken</th>
                <th>Leave Request</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                employees?.map((employee, index) => {
                  return (
                    <tr key={index}>
                      <td>{employee.name}</td>
                      <td>
                        <div className="table__quan">
                            {employee.totalLeave}
                        </div>
                      </td>
                      <td>{employee.leaveLeft}</td>
                      <td>{employee.leaveTaken}</td>
                      <td>{employee.request}</td>
                      <td>
                        <div className="table__quan">
                          <button 
                            className="table__add table__remove-icon"
                            onClick={() => handleApproval(employee.status)}
                          >
                            {employee.status}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }


  const AccountScreen = () => (
    <div className="dashLayout__account">
      <Form className="dashLayout__form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder={emailAddress} 
            disabled 
            className="dashLayout__form-item"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Full name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder={`${firstName} ${lastName}`} 
            disabled 
            className="dashLayout__form-item"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Role</Form.Label>
          <Form.Control type="text" placeholder={role} disabled className="dashLayout__form-item"/>
        </Form.Group>
      </Form>
    </div>
  );

  const downloadFile = (link) => window.location.href = link;

  const DocumentScreen = () => (
    <div className="dashLayout__document">
      {
        docLinks.map((docLink) => (
          <Card style={{ width: '18rem',     padding: '20px', marginBottom: '20px' }} key={docLink}>
            <Card.Img variant="top" src="https://res.cloudinary.com/skybound/image/upload/v1693863186/document-svgrepo-com.png"/>
            <Card.Body>
              <Card.Title>{docLink.name}</Card.Title>
              <Card.Text>
                Link to leave the company leave application form
              </Card.Text>
              <Button 
                variant="primary" 
                size="lg" 
                style={{ marginTop: '10px' }}
                onClick={() => downloadFile(docLink.link)}
              >Download</Button>
            </Card.Body>
          </Card>
        ))
      }
    </div>

  );

  const screenObject = {
    Dashboard: <DashboardContent />,
    Employee: <EmployeeScreen />,
    Account: <AccountScreen />,
    Documents: <DocumentScreen />
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