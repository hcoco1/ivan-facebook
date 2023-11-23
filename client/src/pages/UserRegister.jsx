import React from 'react';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

import api from '../components/api';



const StyledForm = styled(Form)`
    width: 300px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormDiv = styled.div`
    margin-bottom: 15px;
`;

const StyledLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
`;

const StyledInput = styled(Field)`
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
    &:focus {
        border-color: #1877f2;
        outline: none;
    }
`;

const StyledButton = styled.button`
    background-color: #1877f2;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
        background-color: #166fea;
    }
`;

const StyledErrorMessage = styled(ErrorMessage)`
    color: red;
    font-size: 12px;
    margin-bottom: 5px;
`;
const SuccessMessage = styled.p`
    color: #1877F2; 
    font-size: 24px;  
    font-weight: bold;
    text-align: center;  
    margin-top: 20px;  
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;  
`;

// Validation schema
const SignupSchema = Yup.object().shape({
  username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').required('Required'),
});


const MyForm = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (values) => {
    api.register({
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password
    })
      .then(response => {
        console.log("User registered successfully:", response.data);
        setIsRegistered(true);  // set the state to true once registration is successful


        setTimeout(() => {
          navigate('/login');
        }, 5000);
      })
      .catch(error => {
        console.error("Error registering user:", error.message || error);
      });
  }





  return (
    <div>
      {/* Display success message if user is registered */}
      {isRegistered && <SuccessMessage>User registered successfully! Redirecting to Login Form...</SuccessMessage>}

      <Formik
        initialValues={{
          name: '',
          username: '',
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <StyledForm>
            <FormDiv>
              <StyledLabel htmlFor="name">Name</StyledLabel>
              <StyledInput name="name" type="text" />
              <StyledErrorMessage name="name" component="div" />
            </FormDiv>

            <FormDiv>
              <StyledLabel htmlFor="username">Username</StyledLabel>
              <StyledInput name="username" type="text" />
              <StyledErrorMessage name="username" component="div" />
            </FormDiv>

            <FormDiv>
              <StyledLabel htmlFor="email">Email</StyledLabel>
              <StyledInput name="email" type="email" />
              <StyledErrorMessage name="email" component="div" />
            </FormDiv>

            <FormDiv>
              <StyledLabel htmlFor="password">Password</StyledLabel>
              <StyledInput name="password" type="password" />
              <StyledErrorMessage name="password" component="div" />
            </FormDiv>

            <StyledButton type="submit">Register</StyledButton>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              Have an account already? <Link to="/login">Sign In</Link>
            </div>

          </StyledForm>
        )}
      </Formik>
    </div>
  );
};

export default MyForm;