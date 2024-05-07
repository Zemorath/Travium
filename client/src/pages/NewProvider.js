import React from "react";
// import { useFormik } from 'formik'
import ProviderForm from "../components/ProviderForm";

function NewProvider({ useState, user }) {

    return (
        <ProviderForm user={user}/>
    )
}

export default NewProvider