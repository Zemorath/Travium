import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        error: null,
        isLoggedIn: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.error = null;
            state.isLoggedIn = true
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearUser: (state) => {
            state.user = null
            state.isLoggedIn = false
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

export const updateUser = (updatedUserData) => async (dispatch) => {
    try {
        const response = await fetch('/userinfo', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUserData)
        })

        if (response.ok) {
            const user = await response.json()
            dispatch(setUser(user))
        } else {
            const error = await response.json()
            dispatch(setError(error.message))
        }
    } catch (error) {
        dispatch(setError('An error occurred while udpating user information'))
    }
}

export const deleteUser = () => async (dispatch) => {
    try {
        const response = await fetch('/userinfo', {
            method: 'DELETE',
        });

        if (response.ok) {
            dispatch(clearUser());
        } else {
            const error = await response.json();
            dispatch(setError(error.message));
        }
    } catch (error) {
        dispatch(setError('An error occurred while deleting user account'));
    }
}


export const selectUserState = (state) => state.user;
export default userSlice.reducer;