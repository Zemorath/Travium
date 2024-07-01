import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import Label from "../styles/Label"
import '../styles/AccountInfo.css'
import { useDispatch } from 'react-redux'
import { updateUser, deleteUser } from '../redux/UserSlice'
import { updateEmployee, deleteEmployee } from '../redux/EmployeeSlice'



function Account({ userInfo, employeeInfo}) {
    const dispatch = useDispatch()
    const user = useSelector(selectUserState)
    const employee = useSelector(selectEmployeeState)
    const [showInput, setShowInput] = useState(false)
    
    

    const handleForm = async () => {
        setShowInput(!showInput)
    }

    const handleDelete = async () => {

        const confirmDelete = (window.confirm("Are you sure you want to delete your account?"))
        if (confirmDelete) {
            if (employee.isLoggedIn) {
                dispatch(deleteEmployee())
            } else {
                dispatch(deleteUser())
            }
        }
    }

    const handleEdit = async (values) => {
        try {
            if (employee.isLoggedIn) {
                await dispatch(updateEmployee(values))
            } else {
                await dispatch(updateUser(values))
            }
            setShowInput(false)
        } catch (error) {
            console.error('An error occurred while updating username', error)
        }
    }

    const initialValues = {
        username: employee.isLoggedIn ? employeeInfo.username || '' : userInfo.username || '', 
    }
        
    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username Required')
            .test('is-unique', 'Username must be unique', function (value) {
                // Check if the value is different from the current username
                if (value !== (employee.isLoggedIn ? employeeInfo.username : userInfo.username)) {
                    return true; // Username is unique
                } else {
                    return false; // Username is not unique
                }
            })
    })


    

    return (
        <>
            <Header>{employee.isLoggedIn ? 'Employee Information' : 'User Information'}</Header>
            <UserTemplate>
                <InfoRow>
                    <Info>Username:</Info>
                    <Info>{employee.isLoggedIn ? employeeInfo.username : userInfo.username}</Info>
                </InfoRow>
                <InfoRow>
                    <Info>Email:</Info>
                    <Info>{employee.isLoggedIn ? employeeInfo.email : userInfo.email}</Info>
                </InfoRow>
                {!employee.isLoggedIn && (
                    <>
                        <InfoRow>
                            <Info>First Name:</Info>
                            <Info>{userInfo.first_name}</Info>
                        </InfoRow>
                        <InfoRow>
                            <Info>Last Name:</Info>
                            <Info>{userInfo.last_name}</Info>
                        </InfoRow>
                        
                        <InfoRow>
                            <Info>Date Joined:</Info>
                            <Info>{userInfo.created_at}</Info>
                        </InfoRow>
                    </>
                )}
            </UserTemplate>
            <div className='button-container'>
                {!employee.isLoggedIn && (
                    <button onClick={handleForm} className='change-username-btn'>
                        Change Username
                    </button>
                )}
                {showInput && (
                    <div className="form-container">
                        <Formik
                            onSubmit={handleEdit}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                        >
                            <Form>
                                <FieldContainer>
                                    <Label htmlFor='username'>Enter New Username</Label>
                                    <Field
                                        type='text'
                                        id='username'
                                        name='username'
                                    />
                                    <ErrorMessage name='username' />
                                </FieldContainer>
                                <button type='submit'>Submit</button>
                            </Form>
                        </Formik>
                        <button onClick={handleForm} className='back-btn'>Back</button>
                    </div>
                )}

                <button onClick={handleDelete} className='delete-account-btn'>
                    {employee.isLoggedIn ? 'Delete Employee Account' : 'Delete User Account'}
                </button>
            </div>
        </>
    );
}

const FieldContainer = styled.div`
    padding-top: 15px;
`;

const UserTemplate = styled.table`
    width: 30%;
    height: 550px;
    margin: auto;
    border: 3px solid black;
    padding: 10px;
    margin-top: 1%;
    text-align: center;
`;

const InfoRow = styled.tr`
    background-color: white;

    &:hover {
        background-color: #ddd;
    }
`;

const Info = styled.td`
    border: 1px solid black;
`;

const Header = styled.h1`
    text-align: center;
    font-size: 24px;
    margin-top: 1%;
`;

export default Account;