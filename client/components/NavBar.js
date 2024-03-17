import React from "react";
import { Link } from "react-router-dom";

function NavBar({ user, setUser}) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/services'>Services</Link>
                </li>
                <li>
                    <Link to='/account'>Account</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar