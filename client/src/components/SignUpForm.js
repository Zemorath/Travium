import React, { useState } from "react";
import { Formik, useFormik } from 'formik';

// function SignUpForm({ onLogin }) {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [firstName, setFirstName] = useState("")
    // const [lastName, setlastName] = useState("")
    // const [age, setAge] = useState(0)
    // const [email, setEmail] = useState("")


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
    const formik = useFormik({
        initialValues: { 
            username: '', 
            password: '', 
            first_name: '', 
            last_name: '', 
            age: 0, 
            email: ''
        }
    })
    
    return (
        <div>
            <form>
                <input
                    type='text'
                    name='username'
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <input
                    type='password'
                    name='password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <input
                    type='text'
                    name='first_name'
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                />
                <input
                    type='text'
                    name='last_name'
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                />
                <input
                    type='text'
                    name='age'
                    onChange={formik.handleChange}
                    value={formik.values.age}
                />
                <input
                    type='email'
                    name='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
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
//             onSubmit={(e) => {
//                 e.preventDefault();
//                 setErrors([]);
//                 setIsLoading(true);
//                 fetch("/usersignup", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         username,
//                         password,
//                         password_confirmation: passowrdConfirmation,
//                         first_name,
//                         last_name,
//                         age,
//                         email,
//                     }),
//                 }).then((r) => {
//                     setIsLoading(false);
//                     if (r.ok) {
//                         r.json().then((user) => onLogin(user));
//                     } else {
//                         r.json().then((err) => setErrors(err.errors));
//                     }
//                 });
//             }}
//         >
//             {({
//                 values,
//                 errors,
//                 handleChange,
//                 handleSubmit,
//             }) => (
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type='text'
//                         name='username'
//                         onChange={handleChange}
//                         value={values.username}
//                     />
//                     <input
//                         type='password'
//                         name='password'
//                         onChange={handleChange}
//                         value={values.password}
//                     />
//                     <input
//                         type='text'
//                         name='first_name'
//                         onChange={handleChange}
//                         value={values.first_name}
//                     />
//                     <input
//                         type='text'
//                         name='last_name'
//                         onChange={handleChange}
//                         value={values.last_name}
//                     />
//                     <input
//                         type='text'
//                         name='age'
//                         onChange={handleChange}
//                         value={values.age}
//                     />
//                     <input
//                         type='email'
//                         name='email'
//                         onChange={handleChange}
//                         value={values.email}
//                     />
//                     <button type='submit'>
//                         Submit
//                     </button>
//                 </form>
//             )}
//         </Formik>
//     </div>
// );
    
// }

export default SignUp