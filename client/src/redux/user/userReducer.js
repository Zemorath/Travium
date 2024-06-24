

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './userTypes'

const initialState = {
    loading: false,
    user: null,
    error: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export default userReducer