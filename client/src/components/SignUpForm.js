import React from "react";
import { useFormik } from 'formik';
import Label from "../styles/Label"
// import Button from "../styles/Button"
// import FormField from "../styles/FormField"
import Input from "../styles/Input"


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
                <Label htmlFor='username'>Username</Label>
                <Input
                    type='text'
                    id='username'
                    name='username'
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    label='Username'
                />
                <Label htmlFor='password'>Password</Label>
                <Input
                    type='password'
                    id='password'
                    name='password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    label="Password"
                />
                <Label htmlFor='first_name'>First Name</Label>
                <Input
                    type='text'
                    id='first_name'
                    name='first_name'
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                    label='First Name'
                />
                <Label htmlFor='last_name'>Last Name</Label>
                <Input
                    type='text'
                    id='last_name'
                    name='last_name'
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                    label='Last Name'
                />
                <Label htmlFor='age'>Age</Label>
                <Input
                    type='number'
                    id='age'
                    name='age'
                    onChange={formik.handleChange}
                    value={formik.values.age}
                    label="Age"
                />
                <Label htmlFor='email'>Email</Label>
                <Input
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


export default SignUp