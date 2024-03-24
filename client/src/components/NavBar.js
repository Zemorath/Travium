import React from "react";
import { Link } from "react-router-dom";
import '../styles/NavBar.css';
import Button from "../styles/Button";
import logo from '../assets/Travium_transparent.png';


function NavBar({ user, setUser }) {

    function handleLogoutClick() {
        fetch("/userlogout", { method: 'DELETE'}).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        })
    }
    return (
        <div className="navbar">

            <img src={logo} alt="logo" class="logo" width='250' height='200'/>

            <nav>
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
                    <li>
                        <Button variant="outline" onClick={handleLogoutClick}>
                            Logout
                        </Button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar