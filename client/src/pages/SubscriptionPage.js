import React, { useState, useEffect, useRef } from 'react';
import Accordion from '../components/Accordion';
import { Link } from "react-router-dom";

function SubscriptionPage() {
    return (
        <>
            <div>
                <Accordion />
            </div>
            {/* <div className="sub-button-container">
                <button className='sub-button'>
                    Add a new subscription!
                </button>
            </div> */}
        </>
    ) 
}

export default SubscriptionPage


