import { createSlice } from "@reduxjs/toolkit"


// export const loginUser=createAsyncThunk(
//     'user/loginUser',
//     async(initialValues) => {
//         const request = await axios.post('/userlogin',initialValues)
//         const response = await request.data.data;
//         localStorage.setItem('user', JSON.stringify(response))
//         return response
//     }
// )

// const userSlice = createSlice({
//     name: 'user',
//     initialState:{
//         loading: false,
//         user: null,
//         error: null
//     },
//     extraReducers:(builder) => {
//         builder
//         .addCase(loginUser.pending, (state) => {
//             state.loading = true;
//             state.user = null;
//             state.error = null;
//         })
//         .addCase(loginUser.fulfilled,(state,action) => {
//             state.loading = false;
//             state.user = action.payload;
//             state.error = null;
//         })
//         .addCase(loginUser.rejected,(state,action)=>{
//             state.loading = false;
//             state.user = null;
//             console.log(action.error.message)
//             if (action.error.message === 'Request failed with status code 401'){
//                 state.error = "Access Denied! Invalid Credentials"
//             } else{
//                 state.error = action.error.message
//             }
//         })
//     }
// })

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        error: null,
    },
    reducers: {
        loginUserSuccess: (state, action) => {
            state.user = action.payload;
            state.error = null;
        },
        loginUserFailure: (state, action) => {
            state.user = null;
            state.error = action.payload;
        },
    },
});

export const { loginUserSuccess, loginUserFailure } = userSlice.actions;
export default userSlice.reducer;

export const loginUser = (userData) => async (dispatch) => {
    try {
        const response = await fetch ('/userlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Login failed')
        }

        const user = await response.json()
        dispatch(loginUserSuccess(user))
    } catch (error) {
        dispatch(loginUserFailure(error.message))
    }
}

// const handleSubmit = async (values) => {
    //     try {
    //         const response = await fetch('/userlogin', {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(values, null, 2)
    //         });

    //         if (response.ok) {
    //             console.log("Form submitted", values);
    //             response.json().then((user) => onLogin(user))
    //         } else {
    //             console.error("An error occurred while submitting the form.");
    //             setShowError(true)
    //         } 
    //     } catch (error) {
    //         console.error('An error occurred while submitting the form.', error)
    //     }
    // }
