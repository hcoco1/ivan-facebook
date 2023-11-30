import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { selectUser, setUser } from '../features/counter/counterSlice';
import { useSelector, useDispatch } from 'react-redux';
import api from '../components/api';
import Image from 'react-bootstrap/Image';


// ... (previous imports)

const UserDetailsContainer = styled.div`
    width: 300px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const UserTitle = styled.h2`
    font-size: 24px;
    color: #1877f2;
    margin-bottom: 15px;
    font-weight: 700;
    text-align: center;
`;

const UserInfo = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
    color: #1c1e21;
`;

const UserLabel = styled.strong`
    color: #4b4f56;
    margin-right: 5px;
`;

const Button = styled.button`
    background: #1877f2;
    border: none;
    border-radius: 5px;
    color: #ffffff;
    margin: 10px 0;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 16px;
`;

const StyledMessage = styled.p`
    color: #1877f2;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

function UserDetails() {
  const { name } = useParams();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.getUser();
        dispatch(setUser(response.data));
      } catch (error) {
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <UserDetailsContainer>
      <UserTitle>Profile: {name}</UserTitle>
      <Image src={user.avatar + '&s=128'} roundedCircle className="mb-3" />
      <UserInfo><UserLabel>Name:</UserLabel> {user.name}</UserInfo>
      <UserInfo><UserLabel>Username:</UserLabel> {user.username}</UserInfo>
      <UserInfo><UserLabel>Email:</UserLabel> {user.email}</UserInfo>
      <Button>Edit Profile</Button>
      <StyledMessage>Connected on Facebook</StyledMessage>
    </UserDetailsContainer>
  );
}

export default UserDetails;

