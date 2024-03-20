import React, { useState } from "react";
import { Formik, useFormik, handleChange } from 'formik';

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     setErrors([]);
    //     setIsLoading(true);
    //     fetch("/usersignup", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             username,
    //             password,
    //             password_confirmation: passowrdConfirmation,
    //             first_name,
    //             last_name,
    //             age,
    //             email,
    //         }),
    //     }).then((r) => {
    //         setIsLoading(false);
    //         if (r.ok) {
    //             r.json().then((user) => onLogin(user));
    //         } else {
    //             r.json().then((err) => setErrors(err.errors));
    //         }
    //     });
    // }

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
            } else {
                console.error("An error occurred while submitting the form.");
            } 
        } catch (error) {
            console.error('An error occurred while submitting the form.', error)
        }
    }

    const formik = useFormik({
        initialValues: {
            username: '', 
            password: '', 
            first_name: '', 
            last_name: '', 
            age: '', 
            email: '',
        },
        onSubmit: handleSubmit
    })

    


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    id='username'
                    name='username'
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    label='Username'
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    label="Password"
                />
                <label htmlFor='first_name'>First Name</label>
                <input
                    type='text'
                    id='first_name'
                    name='first_name'
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                    label='First Name'
                />
                <label htmlFor='last_name'>Last Name</label>
                <input
                    type='text'
                    id='last_name'
                    name='last_name'
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                    label='Last Name'
                />
                <label htmlFor='age'>Age</label>
                <input
                    type='number'
                    id='age'
                    name='age'
                    onChange={formik.handleChange}
                    value={formik.values.age}
                    label="Age"
                />
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    label='Email'
                />
                <button type='submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}

    

// const SignUp = () => (
//     <div>
//         <Formik
//             initialValues={{ username: '', password: '', first_name: '', last_name: '', age: 0, email: ''}}
//             validate={values => {
//                 const errors = {};
//                 if (!values.username) {
//                     errors.username = 'Required';
//                 } else if (!values.password) {
//                     errors.password = 'Required'
//                 } else if (!values.first_name) {
//                     errors.first_name = 'Required'
//                 } else if (!values.last_name) {
//                     errors.last_name = 'Required'
//                 } else if (!values.age) {
//                     errors.age = 'Required'
//                 } else if (!values.email) {
//                     errors.email = 'Required'
//                 }
//                 return errors;
//             }}

export default SignUp