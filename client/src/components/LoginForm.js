import React from "react";
import Label from "../styles/Label"
import Button from "../styles/Button"
import FormField from "../styles/FormField"
import Input from "../styles/Input"
import { useFormik } from 'formik'

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

    const formik = useFormik ({
        initialValues: {
            username: '',
            password: '',
            
        },
        isLoading: false,
        onSubmit: handleSubmit
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormField>
                <Label htmlFor='username'>Username</Label>
                <Input
                    type="text"
                    id='username'    
                    autoComplete='off'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                />
            </FormField>
            <FormField>
                <Label htmlFor='password'>Password</Label>
                <Input
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
            </FormField>
            <FormField>
                <Button variant="fill" color="primary" type="submit">
                    {formik.values.isLoading ? "Loading..." : "Login"}
                </Button>
            </FormField>
        </form>
    )
}

export default LoginForm