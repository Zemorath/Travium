import React, { useEffect, useState } from "react";
import { Switch, Route, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Login from "../pages/Login";
import SubscriptionPage from "../pages/SubscriptionPage";
import Account from "../pages/Account";
import Home from "../pages/Home"
import NewSubscription from "../pages/NewSubscription";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("/userchecksession").then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
            }
        });
    }, []);

    if (!user) return <Login onLogin={setUser} />;

    return (
        <>
            <NavBar user={user} setUser={setUser}/>
            <main>
                <Switch>
                    <Route path="/services/newsubscription">
                        <NewSubscription />
                    </Route>
                    <Route path="/services">
                        <SubscriptionPage />
                    </Route>
                    <Route path="/account">
                        <Account />
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