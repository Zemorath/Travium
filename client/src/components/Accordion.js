import React, { useState, useEffect, useRef } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri"
import "../styles/Accordion.css";



const AccordionItem = ({ type, sub_price, provider_price, description, status, isOpen, onClick }) => {
    const contentHeight = useRef()

    return(
        <div className="wrapper">
            <button className={`type-container ${isOpen ? 'active' : ''}`} onClick={onClick}>
                <p className='type-content'>{type}</p>
                <RiArrowDropDownLine className={`arrow ${isOpen ? 'active' : ''}`} />
            </button>

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
        <div className='container'>
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
        </div>
    )
};

export default Accordion