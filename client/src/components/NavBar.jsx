
import { NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../components/api';
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, clearUser } from '../features/counter/counterSlice';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import './NavBar.css'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #BF4F74;
  color: #BF4F74;
  margin: 1em 1em;
  padding: 0.50em 0.75em;
`;




export default function NavigationBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    function handleLogout() {
        api.logout()
            .then(() => {
                dispatch(clearUser());
                console.log("Logout successful");
                navigate("/login");
            })
            .catch(err => {
                console.error("Error during logout:", err);
            });
    }

    return (
        <Navbar bg="primary" data-bs-theme="dark">
            <Nav.Item>
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            </Nav.Item>

            {user && user.username && (
                <>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to={`/user/${user.username}`}>Hi, {user.username}</Nav.Link>
                    </Nav.Item>
                    <Button variant="primary" onClick={handleLogout}>
                        Sign Out
                    </Button>
                </>
            )}

            {!user && (
                <>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                    </Nav.Item>
                </>
            )}
        </Navbar>
    );
}
