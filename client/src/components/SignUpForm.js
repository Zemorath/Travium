import React from "react";
import Label from "../styles/Label"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import styled from "styled-components";
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser} from '../redux/UserSlice'


function SignUp() {

    const dispatch = useDispatch()
    const error = useSelector((state) => state.user.error)

    const handleSubmit = async (values) => {
        dispatch(signupUser(values));
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


export default SignUp