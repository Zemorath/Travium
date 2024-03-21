import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function SubscriptionList() {

    const [subscriptions, setsubScriptions] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch('/subscriptionsusing')
            .then((r) => r.json())
            .then(setsubScriptions)
    }, []);

    const toggle = () => {
        setOpen(!open);
    };

    console.log(subscriptions)
    return (
        <Wrapper>
            <Heading>Current Services</Heading>
            {subscriptions.length > 0 ? (
                subscriptions.map((sub) => (
                    <Sub key={sub.id}>
                        <SubWrapper>
                            <Collapsible onClick={toggle}>{sub.type}</Collapsible>
                            {open && (<Content>
                                <h2> Type:</h2>
                                <p>
                                    <div>Total Cost: {sub.sub_price + sub.provider_price}</div>
                                    <br></br>
                                    {sub.description}
                                </p>
                            </Content>)}
                        </SubWrapper>
                    </Sub>
                ))
            ) : (
                <>
                    <h2> No Subscriptions found</h2>
                </>
            )}
        </Wrapper>
    );
}

const Collapsible = styled.button`
    background-color: #403e39;
    color: white;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
`

const Content = styled.div`
    padding: 0 18px;
    display: none;
    overflow: hidden;
    background-color: #f1f1f1;
`

const Wrapper = styled.section`
    max-width: 1000px;
    margin: 40px auto;
    border-left: 5px double black;
    padding-left: 50px;
`;

const SubWrapper = styled.section`
    max-width: 500px;
`

const Sub = styled.article`
    margin-bottom: 240px;
`;

const Heading = styled.h1`
    font-size: 36px;
    text-align: center;
    border-bottom-style: ridge;
    max width: 100%;
    width: 800px;
`;

export default SubscriptionList