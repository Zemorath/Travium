export const loginApi = async (credentials) => {
    try {
        const response = await fetch('/userlogin', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })

        if (!response.ok) {
            throw new Error('Invalid username or password')
        }

        return response.json()
    } catch (error) {
        throw new Error('An error occurred while loggin in')
    }
}

export const signupApi = async (userData) => {
    try {
        const response = await fetch('/usersignup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })

        if (!response.ok) {
            throw new Error('Username or email is already in use')
        }

        return response.json()
    } catch (error) {
        throw new Error('An error occurred while signing up')
    }
}