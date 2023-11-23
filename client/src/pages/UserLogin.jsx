import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import api from '../components/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/counter/counterSlice';

// Define styled components
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
const StyledMessage = styled.p`
    color: #1877F2;  // Facebook blue color for success
    font-size: 24px;  
    font-weight: bold;
    text-align: center;  
    margin-top: 20px;  
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;  
`;

const StyledErrorMessageStyle = styled(StyledMessage)`
    color: #e74c3c;  // A red color for errors
`;





function UserLogin() {
    const dispatch = useDispatch();
    const [loginMessage, setLoginMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const messageFromState = location.state?.message || '';
    React.useEffect(() => {
        if (messageFromState) {
            setLoginMessage(messageFromState);
        }
    }, [messageFromState]);

    return (
        <div>
            {loginMessage &&
                (loginMessage.includes('failed') ? (
                    <StyledErrorMessageStyle>{loginMessage}</StyledErrorMessageStyle>
                ) : (
                    <StyledMessage>{loginMessage}</StyledMessage>
                ))}
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Invalid email').required('Required'),
                    password: Yup.string().required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setIsLoading(true);
                    api.login(values)
                        .then(response => {
                            const user = response.data;
                            if (user.message) {
                                setLoginMessage(user.message);
                            } else {
                                console.log("Logged in as:", user);
                                dispatch(setUser(user)); // Dispatch the setUser action
                            
                                setLoginMessage('Login successful! Redirecting to user page...');
                                setTimeout(() => {
                                    navigate('/user');
                                }, 3000);
                            }
                        })
                        .catch(error => {
                            console.error("Error during login:", error.message || error);
                            setLoginMessage('Login failed. Please try again.');
                        })
                        .finally(() => {
                            setIsLoading(false);
                            setSubmitting(false);
                        });
                }}
            >
                {({ isSubmitting }) => (
                    <StyledForm>
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

                        <StyledButton type="submit" disabled={isSubmitting}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </StyledButton>

                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            Don't have an account yet? <Link to="/register">Sign Up</Link>
                        </div>
                    </StyledForm>
                )}
            </Formik>
        </div>
    );
}

export default UserLogin;




