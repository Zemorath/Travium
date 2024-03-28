import React, { useState, useEffect, useRef } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri"
import "../styles/Accordion.css";
import styled from "styled-components";



const AccordionItem = ({ type, sub_price, provider_price, description, status, isOpen, onClick }) => {
    const contentHeight = useRef()

    return(
        <div className="wrapper">
            <button className={`type-container ${isOpen ? 'active' : ''}`} onClick={onClick}>
                <p className='type-content'>{type}</p>
                <RiArrowDropDownLine className={`arrow ${isOpen ? 'active' : ''}`} />
            </button>
            <div>
                <div ref={contentHeight} className="info-container" style={
                    isOpen
                    ? { height: contentHeight.current.scrollHeight }
                    : { height: "0px" }
                }>
                    <p className="info-content">
                        {description}
                        <hr />
                        Price: {sub_price + provider_price}
                        <hr />
                        Active: {status}
                    </p>
                </div>
            </div>
        </div>
    )
}




const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null)
    const [subscriptions, setsubScriptions] = useState([]);

    useEffect(() => {
        fetch('/subscriptionsusing')
            .then((r) => r.json())
            .then(setsubScriptions)
    }, []);

    const handleItemClick = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    }

    return (
        <Wrapper>
            <div className='container'>
                <Heading>Current Services</Heading>
                {subscriptions.map((item, index) => (
                    <AccordionItem 
                        key={index} 
                        type={item.type} 
                        sub_price={item.sub_price} 
                        provider_price={item.provider_price} 
                        description={item.description} 
                        status={item.status}
                        isOpen={activeIndex === index}
                        onClick={() => handleItemClick(index)}
                    />    
                ))}
                <div className="sub-button-container">
                <button className='sub-button'>
                    Add a new subscription!
                </button>
            </div>
            </div>
        </Wrapper>
    )
};

const Heading = styled.h1`
    font-size: 36px;
    left: 50%;
    max width: 100%;
    width: 800px;
    margin-bottom: 25px;
`;

const Wrapper = styled.section`
    max-width: 1000px;
    margin: 40px auto;
    border-left: 5px double black;
    padding-left: 50px;
`;

export default Accordion