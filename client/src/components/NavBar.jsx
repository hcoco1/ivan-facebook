
import { NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaSignOutAlt, FaListOl, FaIcons, FaShoppingCart } from 'react-icons/fa';
import api from '../components/api';
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, clearUser } from '../features/counter/counterSlice';

import './NavBar.css'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #BF4F74;
  color: #BF4F74;
  margin: 0 1em;
  padding: 0.25em 0.75em;
`;

// ... (other imports)

function NavigationBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    function handleLogout() {
        api.logout()
            .then(() => {
                dispatch(clearUser());
                console.log("Logout successful");
                navigate("/");
            })
            .catch(err => {
                console.error("Error during logout:", err);
            });
    }


    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                <ul className="navbar-nav" style={{ flexDirection: 'row', alignItems: 'center', listStyleType: 'none' }}>
                    <li className="nav-item" style={{ marginRight: '10px' }}>
                        <NavLink
                            to="."
                            style={({ isActive, isPending }) => {
                                return {
                                    fontWeight: isActive ? "bold" : "",
                                    color: isPending ? "red" : "white",
                                };
                            }}
                        >
                            <FaHome /> Home
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        {user ? (
                            <NavLink
                                to="/user"
                                style={({ isActive, isPending }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        color: isPending ? "red" : "white",
                                    };
                                }}
                            >
                                <FaSignOutAlt /> Hi, {user.name}
                            </NavLink>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    style={({ isActive, isPending }) => {
                                        return {
                                            fontWeight: isActive ? "bold" : "",
                                            color: isPending ? "red" : "white",
                                        };
                                    }}
                                >
                                    <FaSignInAlt /> Sign In
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    style={({ isActive, isPending }) => {
                                        return {
                                            fontWeight: isActive ? "bold" : "",
                                            color: isPending ? "red" : "white",
                                        };
                                    }}
                                >
                                    <FaSignOutAlt /> Sign Up
                                </NavLink>
                            </>
                        )}
                    </li>

                    {user && (
                        <li className="nav-item">
                            <Button $primary onClick={handleLogout}>
                                Sign Out
                            </Button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default NavigationBar;


