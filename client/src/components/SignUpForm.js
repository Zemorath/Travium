import React, { useState } from "react";
import { Formik } from 'formik';

function SignUpForm({ onLogin }) {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [firstName, setFirstName] = useState("")
    // const [lastName, setlastName] = useState("")
    // const [age, setAge] = useState(0)
    // const [email, setEmail] = useState("")


    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/usersignup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passowrdConfirmation,
                first_name,
                last_name,
                age,
                email,
            }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => onLogin(user));
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <div>
            <Formik
                initialValues={{ username: '', password: '', first_name: '', last_name: '', age: 0, email: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.username) {
                        errors.username = 'Required';
                    }
                }}
            >

            </Formik>
        </div>
    )
}

export default SignUpForm