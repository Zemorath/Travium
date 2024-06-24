import {
    FETCH_EMP_REQUEST,
    FETCH_EMP_SUCCESS,
    FETCH_EMP_FAILURE
} from './empTypes'

const initialState = {
    loading: false,
    emp: null,
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EMP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_EMP_SUCCESS:
            return {
                loading: false,
                emp: action.payload,
                error: ''
            }
        case FETCH_EMP_FAILURE:
            return {
                loading: false,
                emp: null,
                error: action.payload
            }
        default: return state
    }
}

export default reducer