import React from "react";
import { Link } from "react-router-dom";
import '../styles/NavBar.css';
import Button from "../styles/Button";
import logo from '../assets/Travium.png';


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

            <img src={logo} alt="logo" class="logo" width='170' height='90'/>

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
                    
                    <Button className="logout" variant="outline" onClick={handleLogoutClick}>
                        Logout
                    </Button>
                    
                </ul>
            </nav>
        </div>
    );
};

export default NavBar