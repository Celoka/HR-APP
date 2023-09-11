import React, { useContext, useState } from 'react';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import TimeOffStatistics from '../TimeOffStatistics';
import Card from 'react-bootstrap/Card';
import { useQuery, useMutation } from 'react-query';
import Modal from 'react-bootstrap/Modal';

import { 
  postData, 
  getData,
  toastProperty, 
  success, 
  UserDetails 
} from '../../Data';

import './index.scss';

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


const DashLayout = ({ currentScreen }) => {
  const user = useContext(UserDetails);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState({});
  const { isLoading, isError, data, error }  = useQuery('totalData', () => getData('stats/'));
  const userList = useQuery('userList', () => getData('user/admin/all-users'));
  const users_status = userList?.data?.payload?.users_status;
  const [selectManagerData, setSelectManagerData] = useState({});

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

  const handleClose = () => {
    setShow(false);
    setSelectedStaff({})
  };

  const handleShow = () => setShow(true);

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
          <div  className="dashLayout__item">
            <div className="dashLayout__item-cover">
              <p>Total employees</p>
              <div className="dashLayout__item-content">
                <h1>{data?.payload?.total_employees}</h1>
                <p>23%</p>
              </div>
            </div>
              <div className="dashLayout__item-descr">
                <p>13 applications need review</p>
              </div>
            </div>

            <div  className="dashLayout__item">
            <div className="dashLayout__item-cover">
              <p>Total Leave Application</p>
              <div className="dashLayout__item-content">
                <h1>{data?.payload?.total_leave_applications}</h1>
                <p>30%</p>
              </div>
            </div>
              <div className="dashLayout__item-descr">
                <p>98 leave application</p>
              </div>
            </div>

            <div  className="dashLayout__item">
              <div className="dashLayout__item-cover">
                <p>Total Paid Leave</p>
                <div className="dashLayout__item-content">
                  <h1>{data?.payload?.total_paid_leave}</h1>
                  <p>3%</p>
                </div>
              </div>
              <div className="dashLayout__item-descr">
                <p>80 paid leave approved</p>
              </div>
            </div>

            <div  className="dashLayout__item">
              <div className="dashLayout__item-cover">
                <p>Total Pending Application</p>
                <div className="dashLayout__item-content">
                  <h1>{data?.payload?.total_pending_applications}</h1>
                  <p>23%</p>
                </div>
              </div>
              <div className="dashLayout__item-descr">
                <p>50 pending application approval</p>
              </div>
            </div>

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
            <TimeOffStatistics data={data} />
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
      </main>
    </section>
  );

  const { firstName, lastName, emailAddress, role } = user.userDetails;

  const mutation = useMutation((data) => postData(data, 'user/assign-manager'), {
    onSuccess: (res) => {
      if(res.msg === 'User does not exist') {
        Toastify({
          text: res.msg,
          ...toastProperty,
          style: error,
        }).showToast();
      }
      else {
        Toastify({
          text: "Manager assigned successfully",
          ...toastProperty,
          style: success,
        }).showToast();
      }
    },
  });

  const handleAddManager = () => {
    const data = {
      subordinateId: selectedStaff.id,
      managerId: Number(selectManagerData),
      superAdminId: user?.userDetails.id,
    };
    mutation.mutate(data);
    handleClose();
  };


  const EmployeeScreen = () => {
    return (
      <div className="dashLayout__employ">
        <h1 className="dashLayout__employ-title">Employee List</h1>
        <div>
          <Table striped bordered hover size="lg">
            <thead>
              <tr>
                <th>#Id</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Event Type</th>
                <th>Leave Start</th>
                <th>Leave End</th>
                <th>Leave Reason</th>
                <th>Status</th>
                <th>Assign a Manager</th>
              </tr>
            </thead>
            <tbody>
              {
                users_status?.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.id}</td>
                    <td>{`${employee.firstName} ${employee.lastName}`}</td>
                    <td>{employee.emailAddress}</td>
                    <td>{employee.eventType}</td>
                    <td>{new Date(employee.leaveStart).toISOString().slice(0, 10)}</td>
                    <td>{new Date(employee.leaveEnd).toISOString().slice(0, 10)}</td>
                    <td>{employee.reason}</td>
                    <td>{employee.status}</td>
                    <td>
                    <Button 
                      variant="outline-primary" 
                      onClick={() => {
                          setSelectedStaff(employee)
                          handleShow()
                        }
                      }
                    >
                      Open
                    </Button>
                    </td>
                  </tr>
                ))
              }
          </tbody>
        </Table>
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
        docLinks?.map((docLink) => (
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Assign Manager</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Staff Email address</Form.Label>
              <Form.Control size="lg" type="text" readOnly placeholder={selectedStaff?.emailAddress} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Staff Full Name</Form.Label>
              <Form.Control 
                size="lg" type="text" readOnly rows={3}
                placeholder={`${selectedStaff?.firstName} ${selectedStaff?.lastName}` }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Super admin Full Name</Form.Label>
              <Form.Control 
                type="text" 
                size="lg"
                rows={3} 
                placeholder={`${user?.userDetails.firstName} ${user?.userDetails.lastName}`}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Select Manager</Form.Label>
              <Form.Select 
                size="lg" 
                onChange={(e) => setSelectManagerData(e.target.value) }
              >
                <option>Select from dropdown</option>
                {
                  users_status?.map((user) => <option value={user.id}>{`${user.firstName} ${user.lastName}`}</option>)
                }
            </Form.Select>
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="outline-primary" onClick={handleAddManager}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
};

export default DashLayout;