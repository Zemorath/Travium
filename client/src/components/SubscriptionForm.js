import React, { useEffect, useState } from "react";
import { Formik, handleChange, Field, Form, ErrorMessage } from 'formik';
import styled from "styled-components";
import FormikControl from './FormikControl'
import "../styles/SubForm.css"


function SubForm({ user }) {

    const [providers, setProviders] = useState([])
    useEffect(() => {
        fetch('/providers').then((r) => {
            if (r.ok) {
                r.json().then((providers) => setProviders(providers))
            }
        });
    }, []);

    const [services, setServices] = useState([])
    useEffect(() => {
        fetch('/availableservices').then((r) => {
            if (r.ok) {
                r.json().then((services) => setServices(services))
            }
        });
    }, []);

    const id = user.id

    const handleSubmit = async (values) => {
        try {
            const response = await fetch("/subscriptionsusing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            });
            console.log(values)
            if (response.ok) {
                console.log("Form submitted", values)
            } else {
                console.error("An error occurred when submitting the form")
            }
        } catch (error) {
            console.error("An error occurred when submitting the form", error)
        }
    }

    const intitialValues = {
        type: '',
        sub_price: 0,
        description: '',
        status: 'active',
        user_id: id,
        provider_id: 0,
    }


    return (
        <Formik 
            initialValues={intitialValues}
            onSubmit={handleSubmit}>
            <Form className="sub-form">
                <h1>Add New Service</h1>
                <FieldContainer>
                    <FormikControl
                        control='selectServices'
                        label='Select a service'
                        name='type'
                        options={services}
                    />
                    <ErrorMessage name='type' />
                </FieldContainer>
                <FieldContainer>
                    <FormikControl 
                        control='selectProviders'
                        label="Select a Provider"
                        name='provider_id'
                        options={providers}
                    />
                    <ErrorMessage name='provider_id' />
                </FieldContainer>
                <FieldContainer>
                    <Label>Please enter how much your service typically costs: </Label>
                    <Field
                        type="number"
                        id="sub_price"
                        name="sub_price"
                    />
                    <ErrorMessage name='sub_price' />
                </FieldContainer>    
                <FieldContainer>
                    <Label>Please write a brief description about your service: </Label>
                    <Field
                        type="text"
                        id="description"
                        name="description"
                        className='description'
                    />
                    <ErrorMessage name='description' />
                </FieldContainer>
                <FieldContainer>
                    <Label></Label>
                    <Field 
                        type='number'
                        id='user_id'
                        name='user_id'
                        className='user_id'
                    />
                </FieldContainer>
                <FieldContainer>
                    <button variant="fill" color="primary" type="submit">
                        Submit
                    </button>
                </FieldContainer> 
            </Form>
        </Formik>
    )
}


const FieldContainer = styled.div`
    padding-top: 15px;
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