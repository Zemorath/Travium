import React, { useEffect, useState } from "react";
import { Formik, useFormik, handleChange } from 'formik';
import styled from "styled-components";


function SubForm() {

    var counter = 0;

    const [services, setServices] = useState([])
    useEffect(() => {
        fetch('/availableservices').then((r) => {
            if (r.ok) {
                r.json().then((services) => setServices(services))
            }
        });
    }, []);


    const handleSubmit = async (values) => {


        try {
            const response = await fetch("/subscriptionsusing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            });

            if (response.ok) {
                console.log("Form submitted", values)
            } else {
                console.error("An error occurred when submitting the form")
            }
        } catch (error) {
            console.error("An error occurred when submitting the form", error)
        }
    }


    const formik = useFormik ({
        initialValues: {
            type: '',
            sub_price: 0,
            description: '',
            status: 'active',
        },
        onSubmit: handleSubmit
    })

    return (
        <FormContainer>
            <form onSubmit={formik.handleSubmit}>
                <h1>Add New Service</h1>
                <FieldContainer>
                    <Label onChange={formik.handleChange} value={formik.values.type}>Service:</Label>
                    <select>
                        <option> SELECT </option>
                        {services.map((item, index) => (
                            <option key={index} value={item}>{item.type}</option>
                        ))}
                    </select>
                </FieldContainer>
                <FieldContainer>
                    <Label>Please enter how much your service typically costs: </Label>
                    <input
                        type="number"
                        id="sub_price"
                        name="sub_price"
                        onChange={formik.handleChange}
                        value={formik.values.sub_price}
                    />
                </FieldContainer>    
                <FieldContainer>
                    <Label>Please write a brief description about your service: </Label>
                    <Description
                        type="text"
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                </FieldContainer>    
            </form>
        </FormContainer>
    )
}

const Description = styled.input`
    width: 70%;
    height: 100px;
`



const FieldContainer = styled.div`
    padding-top: 20px;
`

const FormContainer = styled.div`
    &:not(:last-child) {
        margin-bottom: 12px;
    }
    width: 30%;
    height: 500px;
    margin: auto;
    border: 3px solid black;
    padding: 10px;
    margin-top: 5%;
    text-align: center;
`

const Label = styled.label`
    color: black;
    display: block;
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 8px;
    margin-top: 20px;
`


export default SubForm