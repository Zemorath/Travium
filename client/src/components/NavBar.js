import React from "react";
import { Link } from "react-router-dom";
import '../styles/NavBar.css';
import Button from "../styles/Button";
import logo from '../assets/Travium.png';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUserState } from '../redux/UserSlice';
import { clearEmployee, selectEmployeeState } from '../redux/EmployeeSlice';

function NavBar() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserState); // Selecting user state from UserSlice
    const employee = useSelector(selectEmployeeState); // Selecting employee state from EmployeeSlice

    const handleLogoutClick = () => {
        if (user && user.isLoggedIn) {
            fetch("/userlogout", { method: 'DELETE' }).then((r) => {
                if (r.ok) {
                    dispatch(clearUser());
                }
            });
        } else if (employee && employee.isLoggedIn) {
            fetch("/logout/employee", { method: 'DELETE' }).then((r) => {
                if (r.ok) {
                    dispatch(clearEmployee());
                }
            });
        }
    };

    return (
        <div className="navbar">
            <img src={logo} alt="logo" className="logo" width='170' height='90'/>
            <nav>
                <ul>
                    <li>
                        <Link to='/' className="nav-link">Home</Link>
                    </li>
                    {user && user.isLoggedIn && (
                        <li>
                            <Link to='/services' className="nav-link">Services</Link>
                        </li>
                    )}
                    <li>
                        <Link to='/account' className="nav-link">Account</Link>
                    </li>
                    {employee && employee.isLoggedIn && (
                        <li>
                            <Link to='/new/provider' className="nav-link">New Provider</Link>
                        </li>
                    )}
                    <Button className="logout" variant="outline" onClick={handleLogoutClick}>
                        Logout
                    </Button>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;