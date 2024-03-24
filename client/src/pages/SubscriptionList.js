import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Accordion from "../components/Accordion";

function SubscriptionList() {

    return (
        <Wrapper>
            <Heading>Current Services</Heading>
            <Accordion />
        </Wrapper>
    );
}



const Wrapper = styled.section`
    max-width: 1000px;
    margin: 40px auto;
    border-left: 5px double black;
    padding-left: 50px;
`;

const Heading = styled.h1`
    font-size: 36px;
    text-align: center;
    border-bottom-style: ridge;
    max width: 100%;
    width: 800px;
`;

export default SubscriptionList