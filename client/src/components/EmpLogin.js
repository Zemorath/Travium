import React from "react";
import Label from "../styles/Label"
import Button from "../styles/Button"
import "../styles/SubForm.css"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styled from "styled-components";
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { loginEmployee } from '../redux/EmployeeSlice'

function EmpLoginForm() {
    const dispatch = useDispatch()
    const error = useSelector(state => state.employee.error)

    const handleSubmit = async (values) => {
        dispatch(loginEmployee(values))
            .then((result) => {
                if (result.payload) {
                    localStorage.setItem('userToken')
                    history.push("/")
                }
            })
    }

    // const handleSubmit = async (values) => {
    //     try {
    //         const response = await fetch('/employeelogin', {
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


    const initialValues = {
        username: '',
        password: ''
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Username Required'),
        password: Yup.string().required('Password Required'),
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
                {error && (<ErrorText>{error}t</ErrorText>)}
                <FieldContainer>
                    <Button variant="fill" color="primary" type="submit">
                        Login
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


export default EmpLoginForm