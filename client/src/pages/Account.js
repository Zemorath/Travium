import React, { useEffect, useState } from "react";


function Account() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch("/userinfo").then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
            }
        });
    }, []);

    return (
        <h1>
            Account Information
        </h1>
    )
}

export default Account