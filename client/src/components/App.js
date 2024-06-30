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

function App() {
    
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const history = useHistory()

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('/userchecksession')
                if (response.ok) {
                    const userData = await response.json()
                    dispatch(setUser(userData))
                    history.push("/")
                } else {
                    history.push("/login")
                }
            } catch (error) {
                history.push('/login')
            }
        }

        checkSession()
    }, [dispatch, history])

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
                    {/* <Route path='/login'>
                        <Login />
                    </Route> */}
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </main>
        </>
    )
}

export default App