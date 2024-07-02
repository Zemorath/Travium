import React from "react";
import { useHistory } from "react-router-dom"
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
    const history = useHistory()

    const handleSubmit = async (values) => {
        dispatch(loginEmployee(values))
            .then((result) => {
                if (result.payload) {
                    localStorage.setItem('userToken')
                    history.push("/")
                }
            })
    }

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