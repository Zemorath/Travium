import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearUser: (state) => {
            state.user = null
        }
    },
});

export const { setUser, setError, clearUser } = userSlice.actions;


export const loginUser = (credentials) => async (dispatch) => {
    try {
        const response = await fetch ('/userlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (response.ok) {
            const user = await response.json()
            dispatch(setUser(user))
        } else {
            dispatch(setError('Invalid username or password'))
        }
    } catch (error) {
        dispatch(setError('An error occurred while logging in'))
    }
}

export const signupUser = (userData) => async (dispatch) => {
    try {
        const response = await fetch('/usersignup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const user = await response.json()
            dispatch(setUser(user))
        } else {
            dispatch(setError('Username or email is already in use'))
        }
    } catch (error) {
        dispatch(setError('An error occurred while signing up'))
    }
}

export const updateUser = (newUserData) => async (dispatch) => {
    try {
        const response = await api.patch('/userinfo', newUserData)
        if (response.ok) {
            dispatch(setUser(response.data.user))
        } else {
            dispatch(setError('Failed to update username'))
        }
    } catch (error) {
        dispatch(setError('Failed to update username'))
    }
}

export const deleteUser = () => async (dispatch) => {
    try {
        const response = await api.delete('/userinfo')
        if (response.ok) {
            dispatch(clearUser())
            alert("Account deleted successfully")
            window.location.reload()
        } else {
            dispatch(setError('Failed to delete account'))
        }
    } catch (error) {
        dispatch(setError('Failed to delete account'))
    }
}

export default userSlice.reducer;