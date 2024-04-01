import React, { useEffect, useState } from "react";
import { Formik, handleChange, Field, Form, ErrorMessage } from 'formik';
import styled from "styled-components";
import FormikControl from './FormikControl'


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

    const intitialValues = {
        type: '',
        sub_price: 0,
        description: '',
        status: 'active',
        user_id: {user},
        provider_id: 0,
    }

    // const formik = useFormik ({
    //     // initialValues: {
    //     //     type: '',
    //     //     sub_price: 0,
    //     //     description: '',
    //     //     status: 'active',
    //     //     user_id: {user},
    //     //     provider_id: 0,
    //     // },
    //     onSubmit: handleSubmit
    // })

    return (
        <Formik 
            initialValues={intitialValues}
            onSubmit={handleSubmit}>
            <Form>
                <h1>Add New Service</h1>
                {/* <FieldContainer>
                    <Label>Service:</Label>
                    <select onChange={formik.handleChange} value={formik.values.type} placeholder="Select">
                        {services.map((item, index) => (
                            <option key={index} value={item}>{item.type}</option>
                        ))}
                    </select>
                </FieldContainer> */}
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
                    {/* <Label>Choose Provider:</Label> */}
                    {/* <select onChange={handleChange} value={values.provider_id}>
                        <option> SELECT </option>
                        {providers.map((item, index) => (
                            <option key={index} value={item.company}>{item.company}</option>
                        ))}
                    </select> */}
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
                    />
                    <ErrorMessage name='description' />
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

const Description = styled.input`
    width: 70%;
    height: 100px;
`



const FieldContainer = styled.div`
    padding-top: 15px;
`

const FormContainer = styled.div`
    &:not(:last-child) {
        margin-bottom: 12px;
    }
    width: 30%;
    height: 550px;
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