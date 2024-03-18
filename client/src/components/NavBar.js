import React from "react";
import { Link } from "react-router-dom";
import '../styles/NavBar.css';


function NavBar({ user, setUser}) {
    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link to='/' className="nav-link">Home</Link>
                </li>
                <li>
                    <Link to='/services' className="nav-link">Services</Link>
                </li>
                <li>
                    <Link to='/account' className="nav-link">Account</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar