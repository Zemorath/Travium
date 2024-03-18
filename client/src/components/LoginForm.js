import React, { useState } from "react";

function LoginForm({ onLogin }) {
    return (
        <form onSubmit={handleSubmit}>
            <FormField>
                <Label htmlFor='username'>Username</Label>
                <Input
                    type="text"
                    id='username'    
                    autoComplete='off'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormField>
            <FormField>
                <Label htmlFor='password'>Password</Label>
                <Input
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormField>
        </form>
    )
}

export default LoginForm