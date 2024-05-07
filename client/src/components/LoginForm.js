import React from "react";
import Label from "../styles/Label"
import Button from "../styles/Button"
import FormField from "../styles/FormField"
import "../styles/SubForm.css"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'

function LoginForm({ onLogin }) {


    const handleSubmit = async (values) => {
        try {
            const response = await fetch('/userlogin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
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
        name: '',
        password: ''
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
    })

    return (
        <Formik 
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}>
            <Form>
                <FieldContainer className="field-container">
                    <Label htmlFor='username'>Username</Label>
                    <Field
                        type="text"
                        id='username' 
                        name='username'   
                        className='input'
                    />
                    <ErrorMessage name='username' />
                </FieldContainer>
                <FieldContainer className="field-container">~
                    <Label htmlFor='password'>Password</Label>
                    <Field
                        type='password'
                        id='password'
                        name='password'
                        className='input'
                    />
                    <ErrorMessage name='password' />
                </FieldContainer>
                <FieldContainer className="field-container">
                    <Button variant="fill" color="primary" type="submit">
                        Login
                    </Button>
                </FieldContainer>
            </Form>
        </Formik>
    )
}

export default LoginForm