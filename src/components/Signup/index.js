import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './index.scss';

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setData({
      ...data,
      [name]: value
    })
  };

  const handleRedirect = () => {
    navigate('/login')
  };

  return (
    <section className="auth">
      <section className="auth__section">
        <div className="auth__title-wrapper">
          <h1 className="auth__title">Register</h1>
        </div>
        <Form className="auth__form">
          <Form.Group 
            as={Row} 
            className="mb-3" 
            controlId="formPlaintextEmail"
          >
            <Form.Label 
              column sm="4" 
              className="auth__text"
              name="email"
            >
              Email
            </Form.Label>
            <Form.Control 
              size="lg" 
              type="email" 
              placeholder="example@email.com"
              onChange={handleChange}
              name="email"
            />
          </Form.Group>
          <Form.Group 
            as={Row} 
            className="mb-3" 
            controlId="formPlaintextPassword"
          >
            <Form.Label 
              column sm="4" 
              className="auth__text"
            >
              Password
            </Form.Label>
            <Form.Control 
              size="lg" 
              type="password" 
              placeholder="Password" 
              onChange={handleChange}
              name="password"
            />
          </Form.Group>
        </Form>
          <Button variant="primary" size="lg">Submit</Button>
          <p 
            className="auth__none"
          >
            Have an account?{' '}
              <button 
                className="auth__reg"
                onClick={handleRedirect}
              >Click to Login</button>
          </p>
      </section>
    </section>
  )
}

export default Signup;
