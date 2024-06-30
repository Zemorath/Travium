import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import Label from "../styles/Label"
import '../styles/AccountInfo.css'
import { useDispatch } from 'react-redux'
import { updateUser, deleteUser } from '../redux/UserSlice'



function Account({ user }) {
    const dispatch = useDispatch()
    const [showInput, setShowInput] = useState(false)
    
    

    const handleForm = async () => {
        setShowInput(!showInput)
    }

    const handleDeleteClick = async () => {

        // const confirmDelete = window.confirm("Are you sure you want to delete your account?")
        // if (confirmDelete) {
        //     const response = await fetch('/userinfo', {
        //     method: "DELETE",
        // });
        //     if (response.ok) {
        //         alert("Account deleted successfully")
        //         window.location.reload()
        //     }
        // }

        const confirmDelete = (window.confirm("Are you sure you want to delete your account?"))
        if (confirmDelete) {
            dispatch(deleteUser())
        }
    }

   

    const handleSubmit = async (values) => {
        // try {
        //     const response = await fetch('/userinfo', {
        //         method: 'PATCH',
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(values, null, 2),
        //     });

        //     if (response.ok) {
        //         window.location.reload()
        //     } else {
        //         console.error("An error occurred while submitting the form.");
        //     } 
        // } catch (error) {
        //     console.error('An error occurred while submitting the form.', error)
        // }

        try {
            await dispatch(updateUser(values))
            setShowInput(false)
        } catch (error) {
            console.error('An error occurred while updating username', error)
        }
    }

    const initialValues = {
        username: '', 
    }
        
    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username Required')
            .test('is-unique', 'Username must be unique', function (value) {
                // Check if the value is different from the current username
                if (value !== user.username) {
                    return true; // Username is unique
                } else {
                    return false; // Username is not unique
                }
            })
    })


    

    return (
        <>
            <Header>User Information</Header>
            <UserTemplate>
                <InfoRow>
                    <Info>Username:</Info>
                    <Info>{user.username}</Info>
                </InfoRow>
                <InfoRow>
                    <Info>First Name:</Info>
                    <Info>{user.first_name}</Info>
                </InfoRow>
                <InfoRow>
                    <Info>Last Name:</Info>
                    <Info>{user.last_name}</Info>
                </InfoRow>
                <InfoRow>
                    <Info>Email:</Info>
                    <Info>{user.email}</Info>
                </InfoRow>
                <InfoRow>
                    <Info>Date Joined:</Info>
                    <Info>{user.created_at}</Info>
                </InfoRow>
            </UserTemplate>
            <div className = 'button-container'>
                <button onClick={handleForm} className = 'change-username-btn'>Change Username</button>
                {showInput && (
                    <div className = "form-container">
                        <Formik
                            onSubmit={handleSubmit}
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
                
                <button onClick={handleDeleteClick} className = 'delete-account-btn'>Delete Account</button>
            </div>    
         </>
    )
}

const FieldContainer = styled.div`
    padding-top: 15px;
`

const UserTemplate = styled.table`
    width: 30%;
    height: 550px;
    margin: auto;
    border: 3px solid black;
    padding: 10px;
    margin-top: 1%;
    text-align: center;
`

const InfoRow = styled.tr`
    background-color: white

    &:hover {
        background-color: #ddd;
    }
`

const Info = styled.td`
    border: 1px solid black;
`

const Header = styled.h1`
    text-align: center;
    font-size: 24px;
    margin-top: 1%;
`

export default Account