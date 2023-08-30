import React, { useState, useEffect } from 'react';
import Toastify from 'toastify-js';
import { useNavigate } from "react-router-dom";
import { useMutation, } from 'react-query';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { postData, toastProperty } from '../../Data';

import './index.scss';


const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    emailAddress: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData({
      ...data,
      [name]: value
    })
  };

  const mutation = useMutation((data) => postData(data, 'user/login'), {
    onSuccess: (res) => {
      console.log(res, 'res')
      if(res.msg === 'User does not exist') {
        Toastify({
          text: "Email or password not correct",
          ...toastProperty,
          style: {
            background: "rgb(255, 95, 109)"
          },
        }).showToast();
      }
      else {
        localStorage.setItem('token', res.payload.token);
        Toastify({
          text: "Login was successful",
          ...toastProperty,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
        navigate('/dashboard');
      }
    
    },
  });

  const handleSubmit = async () => {
    if(data.emailAddress.length === 0) {
      Toastify({
        text: "Email Address is empty",
        ...toastProperty,
        style: {
          background: "rgb(255, 95, 109)"
        },
      }).showToast();
    } else if (data.password.length === 0) {
        Toastify({
          text: "Password is empty",
          ...toastProperty,
          style: {
            background: "rgb(255, 95, 109)"
          },
        }).showToast();
    } else {
      mutation.mutate(data);
    }
  }

  const handleRedirect = () => navigate('/register');

  return (
    <section className="auth">
      <section className="auth__section">
        <div className="auth__title-wrapper">
          <h1 className="auth__title">Login</h1>
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
              name="emailAddress"
            >
              Email
            </Form.Label>
            <Form.Control 
              size="lg" 
              type="email" 
              placeholder="example@email.com"
              onChange={handleChange}
              name="emailAddress"
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
          <Button variant="primary" size="lg" onClick={handleSubmit}>Login</Button>
          <p 
            className="auth__none"
          >
            No account?{' '}
              <button 
                className="auth__reg"
                onClick={handleRedirect}
              >
                Click to Register
              </button>
          </p>
      </section>
    </section>
  )
}

export default Login;
