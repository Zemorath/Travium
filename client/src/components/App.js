import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import SubscriptionList from "../pages/SubscriptionList";

function App({ useEffect, useState }) {
    
    return (
        <>
            <NavBar/>
            <main>
                <SubscriptionList />
            </main>
        </>
    )
}

export default App