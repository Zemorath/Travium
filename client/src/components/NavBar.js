import React from "react";
import { Link } from "react-router-dom";
import '../styles/NavBar.css';
import Button from "../styles/Button";
import logo from '../assets/Travium.png';
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/UserSlice'


function NavBar() {

    const dispatch = useDispatch()

    function handleLogoutClick() {
        fetch("/userlogout", { method: 'DELETE'}).then((r) => {
            if (r.ok) {
                dispatch(setUser(null))
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
                    <li>
                        <Link to='/new/provider' className="nav-link">New Provider</Link>
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