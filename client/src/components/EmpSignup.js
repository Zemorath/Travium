import React from "react";
import Label from "../styles/Label"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styled from "styled-components";
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { signupEmployee } from '../redux/EmployeeSlice'


function EmpSignUp() {

    const dispatch = useDispatch()
    const error = useSelector(state => state.employee.error)


    const handleSubmit = async (values) => {
        dispatch(signupEmployee(values));
    }

    // const [errorMessage, setErrorMessage] = useState(false)

    // const handleSubmit = async (values) => {
    //     console.log(JSON.stringify(values, null, 2))
    //     try {
    //         const response = await fetch('/employeesignup', {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(values, null, 2),
    //         });

    //         if (response.ok) {
    //             console.log("Form submitted", values);
    //             response.json().then((user) => onLogin(user))
    //         } else {
    //             setErrorMessage(true);
    //         }
    //     } catch (error) {
    //         console.error('An error occurred while submitting the form.', error)
    //     }
    // }

    const initialValues = {
        username: '', 
        password: '', 
        email: ''
    }
        
    const validationSchema = Yup.object({
        username: Yup.string().required('Username Required'),
        password: Yup.string().required('Password Required'),
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
                    <Label htmlFor='email'>Email</Label>
                    <Field
                        type='email'
                        id='email'
                        name='email'
                    />
                    <ErrorMessage name='email' />
                </FieldContainer>   
                {error && (<ErrorText>{error}</ErrorText>)} 
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

const ErrorText = styled.p`
    color: red;
    margin-top: 5px;
`


export default EmpSignUp