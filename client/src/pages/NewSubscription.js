import React, { useState, useHistory } from "react";
import { useFormik } from 'formik'
import SubForm from "../components/SubscriptionForm";

function NewSubscription({ useState, user }) {

    return (
        <SubForm user={user}/>
    )
}

export default NewSubscription