import React from "react";
import { Link } from "react-router-dom";
import '../styles/NavBar.css';
import Button from "../styles/Button"


function NavBar({ user, setUser }) {

    function handleLogoutClick() {
        fetch("/userlogout", { method: 'DELETE'}).then((r) => {
            if (r.ok) {
                setUser(null)
            }
        })
    }
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
                <Button variant="outline" onClick={handleLogoutClick}>
                    Logout
                </Button>
            </ul>
        </nav>
    );
};

export default NavBar