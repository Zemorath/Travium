import React from "react";
import Label from "../styles/Label"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styled from "styled-components";
import * as Yup from 'yup'


function SignUp({ onLogin }) {


    const handleSubmit = async (values) => {
        console.log(JSON.stringify(values, null, 2))
        try {
            const response = await fetch('/usersignup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            });

            if (response.ok) {
                console.log("Form submitted", values);
                response.json().then((user) => onLogin(user))
            } else {
                console.error("An error occurred while submitting the form.");
            } 
        } catch (error) {
            console.error('An error occurred while submitting the form.', error)
        }
    }

    const initialValues = {
        username: '', 
        password: '', 
        first_name: '', 
        last_name: '', 
        age: '', 
        email: ''
    }
        
    const validationSchema = Yup.object({
        username: Yup.string().required('Username Required'),
        password: Yup.string().required('Password Required'),
        first_name: Yup.string().required('First Name Required'),
        last_name: Yup.string().required('Last Name Required'),
        age: Yup.number().required('Age Required'),
        email: Yup.string().email('Invalid email format').required('Email Required'),
    })
    


    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}>
            <Form>
                <FieldContainer>
                    <Label htmlFor='username'>Username</Label>
                    <Field
                        type='text'
                        id='username'
                        name='username'
                    />
                    <ErrorMessage name='username' />
                </FieldContainer>
                <FieldContainer>
                    <Label htmlFor='password'>Password</Label>
                    <Field
                        type='password'
                        id='password'
                        name='password'
                    />
                    <ErrorMessage name='password' />
                </FieldContainer>
                <FieldContainer>
                    <Label htmlFor='first_name'>First Name</Label>
                    <Field
                        type='text'
                        id='first_name'
                        name='first_name'
                    />
                    <ErrorMessage name='first_name' />
                </FieldContainer>    
                <FieldContainer>
                    <Label htmlFor='last_name'>Last Name</Label>
                    <Field
                        type='text'
                        id='last_name'
                        name='last_name'
                    />
                    <ErrorMessage name='last_name' />
                </FieldContainer>
                <FieldContainer>
                    <Label htmlFor='age'>Age</Label>
                    <Field
                        type='number'
                        id='age'
                        name='age'
                    />
                    <ErrorMessage name='age' />
                </FieldContainer>
                <FieldContainer>
                    <Label htmlFor='email'>Email</Label>
                    <Field
                        type='email'
                        id='email'
                        name='email'
                    />
                    <ErrorMessage name='email' />
                </FieldContainer>    
                <button type='submit'>
                    Submit
                </button>
            </Form>
        </Formik>
    )
}

const FieldContainer = styled.div`
    padding-top: 15px;
`


export default SignUp