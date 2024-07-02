import React from "react";
import SubForm from "../components/SubscriptionForm";

function NewSubscription({ user }) {

    return (
        <SubForm user={user}/>
    )
}

export default NewSubscription