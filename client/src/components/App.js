import React from "react";
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
import { useSelector } from 'react-redux'

function App() {

    const user = useSelector(state => state.user.user)

    if (!user) return <Login />;

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