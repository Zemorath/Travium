import React, { useState } from "react";
import Label from "../styles/Label"
import Button from "../styles/Button"
import "../styles/SubForm.css"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styled from "styled-components";
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/user/userActions'

function LoginForm() {

    // const [showError, setShowError] = useState(false)

    // const handleSubmit = async (values) => {
    //     try {
    //         const response = await fetch('/userlogin', {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(values, null, 2)
    //         });

    //         if (response.ok) {
    //             console.log("Form submitted", values);
    //             response.json().then((user) => onLogin(user))
    //         } else {
    //             console.error("An error occurred while submitting the form.");
    //             setShowError(true)
    //         } 
    //     } catch (error) {
    //         console.error('An error occurred while submitting the form.', error)
    //     }
    // }

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user);

    const initialValues = {
        username: '',
        password: ''
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Username Required'),
        password: Yup.string().required('Password Required'),
    })

    const handleSubmit = (values, { setSubmitting }) => {
        dispatch(loginUser(values));
        setSubmitting(false)
    }

    return (
        <Formik 
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}>
            <Form>
                <FieldContainer>
                    <Label htmlFor='username'>Username</Label>
                    <Field
                        type="text"
                        id='username' 
                        name='username'   
                        className='input'
                    />
                    <ErrorMessage name='username' />
                </FieldContainer>
                <FieldContainer>
                    <Label htmlFor='password'>Password</Label>
                    <Field
                        type='password'
                        id='password'
                        name='password'
                        className='input'
                    />
                    <ErrorMessage name='password' />
                </FieldContainer>
                {error && (<ErrorText>{error}</ErrorText>)}
                <FieldContainer>
                    <Button variant="fill" color="primary" type="submit" disabled={isSubmitting || loading}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                </FieldContainer>
            </Form>
        </Formik>
    )
}

const FieldContainer = styled.div`
    padding-top: 15px;
`
const ErrorText = styled.p`
    color: red;
    margin-top: 5px;
`

export default LoginForm