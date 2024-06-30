import React from "react";
import { useHistory } from "react-router"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styled from "styled-components";
import "../styles/SubForm.css"
import * as Yup from 'yup'

function ProviderForm() {

    const history = useHistory();

    const handleSubmit = async (values) => {
        try {
            const response = await fetch("/providers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            });
            console.log(values)
            if (response.ok) {
                console.log("Form submitted", values)
                history.push('/services')
            } else {
                console.error("An error occurred when submitting the form")
            }
        } catch (error) {
            console.error("An error occurred when submitting the form", error)
        }
    }

    const intitialValues = {
        company: '',
        state: '',
    }

    const validationSchema = Yup.object({
        company: Yup.string().required('Please provide a company'),
        state: Yup.string().required('Please provide a state')
    })


    return (
        <Formik 
            initialValues={intitialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            <Form className="sub-form">
                <h1>Add New Provider</h1>   
                <FieldContainer>
                    <Label>Please provide a new provider you wish to see: </Label>
                    <Field
                        type="text"
                        id="company"
                        name="company"
                        className='company'
                    />
                    <ErrorMessage name='company' />
                </FieldContainer>
                <FieldContainer>
                    <Label>Please provide your state: </Label>
                    <Field
                        type="text"
                        id="state"
                        name="state"
                        className='state'
                    />
                    <ErrorMessage name='state' />
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


export default ProviderForm