import React from "react";
import logo from '../assets/Travium.png'
import styled from "styled-components";

function Home() {
    return (
        <>
            <Title>
                Welcome to Travium!
            </Title>
            <Logo src={logo}/>
        </>
    )
}

const Title = styled.h1`
    text-align: center;
    font-size: 60px;
    weight: 10%;
    margin-top: 5%;
`

const Logo = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    margin-top: 3%;
`

export default Home