import axios from 'axios'

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './userTypes'


export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

export const loginSuccess = user => {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

export const loginFailure = error => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}

export const loginUser = (credentials) => {
    return async (dispatch) => {
        dispatch(loginRequest());
        try {
            const response = await axios.post('/userlogin', credentials);
            dispatch(loginSuccess(response.data));
        } catch (error) {
            dispatch(loginFailure(error.message))
        }
    }
}

