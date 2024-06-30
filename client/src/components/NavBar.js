import React from "react";
import { Link } from "react-router-dom";
import '../styles/NavBar.css';
import Button from "../styles/Button";
import logo from '../assets/Travium.png';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/UserSlice'; // Adjusted for UserSlice
import { clearEmployee } from '../redux/EmployeeSlice'; // Adjusted for EmployeeSlice

function NavBar() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user); // Selecting user state from UserSlice
    const employee = useSelector(state => state.employee.employee); // Selecting employee state from EmployeeSlice

    const handleLogoutClick = () => {
        if (user.isLoggedIn) {
            fetch("/userlogout", { method: 'DELETE' }).then((r) => {
                if (r.ok) {
                    dispatch(setUser(null));
                }
            });
        } else if (employee.isLoggedIn) {
            fetch("/employeelogout", { method: 'DELETE' }).then((r) => {
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
                    <li>
                        <Link to='/services' className="nav-link">Services</Link>
                    </li>
                    <li>
                        <Link to='/account' className="nav-link">Account</Link>
                    </li>
                    {user.isLoggedIn && (
                        <li>
                            <Link to='/subscriptions' className="nav-link">Subscriptions</Link>
                        </li>
                    )}
                    {employee.isLoggedIn && (
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


// import React from "react";
// import { Link } from "react-router-dom";
// import '../styles/NavBar.css';
// import Button from "../styles/Button";
// import logo from '../assets/Travium.png';
// import { useDispatch } from 'react-redux'
// import { setUser } from '../redux/UserSlice'


// function NavBar() {

//     const dispatch = useDispatch()

//     function handleLogoutClick() {
//         fetch("/userlogout", { method: 'DELETE'}).then((r) => {
//             if (r.ok) {
//                 dispatch(setUser(null))
//             }
//         })
//     }
//     return (
//         <div className="navbar">

//             <img src={logo} alt="logo" class="logo" width='170' height='90'/>

//             <nav>
//                 <ul>
//                     <li>
//                         <Link to='/' className="nav-link">Home</Link>
//                     </li>
//                     <li>
//                         <Link to='/services' className="nav-link">Services</Link>
//                     </li>
//                     <li>
//                         <Link to='/account' className="nav-link">Account</Link>
//                     </li>
//                     <li>
//                         <Link to='/new/provider' className="nav-link">New Provider</Link>
//                     </li>
                    
//                     <Button className="logout" variant="outline" onClick={handleLogoutClick}>
//                         Logout
//                     </Button>
                    
//                 </ul>
//             </nav>
//         </div>
//     );
// };

// export default NavBar