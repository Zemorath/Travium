import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
// import LoginForm from "./LoginForm";
// import SignUpForm from "./SignUpForm";
import Login from "../pages/Login";
import SubscriptionPage from "../pages/SubscriptionPage";
import Account from "../pages/Account";
import Home from "../pages/Home"
import NewSubscription from "../pages/NewSubscription";
import NewProvider from '../pages/NewProvider';

function App() {
    const [user, setUser] = useState(null);
    // const [emp, setEmp] = useState(null);

    useEffect(() => {
        fetch("/userchecksession").then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
            } else {
                fetch('/employee/session').then((a) => {
                    if (a.ok) {
                        a.json().then((user) => setUser(user))
                    }
                })
            }
        });
    }, []);

    // useEffect(() => {
    //     fetch("/employee/session").then((r) => {
    //         if (r.ok) {
    //             r.json().then((emp) => setEmp(emp));
    //         }
    //     })
    // }, [])

    if (!user) return <Login onLogin={setUser} />;

    return (
        <>
            <NavBar user={user} setUser={setUser}/>
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