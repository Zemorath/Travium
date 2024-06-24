import {
    FETCH_EMP_REQUEST,
    FETCH_EMP_SUCCESS,
    FETCH_EMP_FAILURE
} from './empTypes'


export const fetchEmpRequest = () => {
    return {
        type: FETCH_EMP_REQUEST
    }
}

const fetchEmpSuccess = emp => {
    return {
        type: FETCH_EMP_SUCCESS,
        payload: emp
    }
}

const fetchEmpFailure = error => {
    return {
        type: FETCH_EMP_FAILURE,
        payload: error
    }
}