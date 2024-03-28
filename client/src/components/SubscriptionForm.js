import React, { useState } from "react";
import { Formik, useFormik, handleChange } from 'formik';


function SubForm() {


    const handleSubmit = async (values) => {
        try {
            const response = await fetch("/subscriptionsusing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2)
            });

            if (response.ok) {
                console.log("Form submitted", values)
            } else {
                console.error("An error occurred when submitting the form")
            }
        } catch (error) {
            console.error("An error occurred when submitting the form", error)
        }
    }


    const formik = useFormik ({
        initialValues: {
            type: '',
            sub_price: '',
            description: '',
            status: 'active',
        }
    })
}


export default SubForm