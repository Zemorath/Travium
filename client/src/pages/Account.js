import React from "react";
import styled from "styled-components";


function Account({ user }) {

    // const [user, setUser] = useState(null)

    // useEffect(() => {
    //     fetch("/userinfo").then((r) => {
    //         if (r.ok) {
    //             r.json().then((user) => setUser(user));
    //         }
    //     });
    // }, []);

    return (
        <>
            <Header>User Information</Header>
            <UserTemplate>
                <InfoRow>
                    <Field>Username:</Field>
                    <Field>{user.username}</Field>
                </InfoRow>
                <InfoRow>
                    <Field>First Name:</Field>
                    <Field>{user.first_name}</Field>
                </InfoRow>
                <InfoRow>
                    <Field>Last Name:</Field>
                    <Field>{user.last_name}</Field>
                </InfoRow>
                <InfoRow>
                    <Field>Email:</Field>
                    <Field>{user.email}</Field>
                </InfoRow>
                <InfoRow>
                    <Field>Date Joined:</Field>
                    <Field>{user.created_at}</Field>
                </InfoRow>
            </UserTemplate>
            </>
    )
}

const UserTemplate = styled.table`
    width: 30%;
    height: 550px;
    margin: auto;
    border: 3px solid black;
    padding: 10px;
    margin-top: 1%;
    text-align: center;
`

const InfoRow = styled.tr`
    background-color: white

    &:hover {
        background-color: #ddd;
    }
`

const Field = styled.td`
    border: 1px solid black;
`

const Header = styled.h1`
    text-align: center;
    font-size: 24px;
    margin-top: 1%;
`

export default Account