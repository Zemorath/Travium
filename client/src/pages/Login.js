import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUp from "../components/SignUpForm";
import { Button } from "../styles";
import styled from "styled-components";

function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <Wrapper>
            <Logo>Travium</Logo>
            {showLogin ? (
                <>
                    <LoginForm onLogin={onLogin} />
                    <Divider />
                    <p>
                        Don't have an account?
                        <Button color="secondary" onClick={() => setShowLogin(false)}>
                            Sign Up
                        </Button>
                    </p>
                </>
            ) : (
                <>
                    <SignUp onLogin={onLogin} />
                    <Divider />
                    <p>
                        Already have an account?
                        <Button color="secondary" onClick={() => setShowLogin(true)}>
                            Log In
                        </Button>
                    </p>
                </>
            )}
        </Wrapper>
    );
}

const Logo = styled.h1`
    font-family: "Courier", monospace;
    font-size: 3rem;
    color: black;
    margin: 8px 0 16px;
`;

const Wrapper = styled.section`
    max-width: 500px;
    margin: 40px auto;
    padding: 16px;
`;

const Divider = styled.hr`
    border: none;
    border-bottom: 1px solid #ccc;
    margin: 16px 0;
`;


export default Login