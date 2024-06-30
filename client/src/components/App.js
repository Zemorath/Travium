import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
// import LoginForm from "./LoginForm";
// import SignUpForm from "./SignUpForm";
import Login from "../pages/Login";
import SubscriptionPage from "../pages/SubscriptionPage";
import Account from "../pages/Account";
import Home from "../pages/Home"
import NewSubscription from "../pages/NewSubscription";
import NewProvider from '../pages/NewProvider';
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/UserSlice'
import { setEmployee } from '../redux/EmployeeSlice'

function App() {
    
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const history = useHistory()

    useEffect(() => {
        const checkSession = async () => {
            try {
                // Check for user session first
                const userResponse = await fetch('/userchecksession');
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    dispatch(setUser(userData));
                    history.push("/");
                    return; // Exit function if user session is valid
                }
    
                // If no user session, check for employee session
                const employeeResponse = await fetch('/employeechecksession');
                if (employeeResponse.ok) {
                    const employeeData = await employeeResponse.json();
                    dispatch(setEmployee(employeeData)); // Dispatch action for employee login
                    history.push("/");
                    return; // Exit function if employee session is valid
                }
    
                // If neither user nor employee session is valid, redirect to login
                history.push("/login");
            } catch (error) {
                console.error('An error occurred while checking session:', error);
                history.push('/login');
            }
        };
    
        checkSession();
    }, [dispatch, history]);

    if (!user) return <Login path='/login'/>;

    return (
        <>
            <NavBar user={user}/>
            <main>
                <Switch>
                    <Route path="/services/newsubscription">
                        <NewSubscription user={user}/>
                    </Route>
                    <Route path="/services">
                        <SubscriptionPage />
                    </Route>
                    <Route path="/account">
                        <Account user={user}/>
                    </Route>
                    <Route path="/new/provider">
                        <NewProvider user={user}/>
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </main>
        </>
    )
}

export default App