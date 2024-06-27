import { Types } from '../actions/actionTypes'

const initialState = {
    profile: {
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        username: '',
        password: ''
    },
    formSubmitted: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN:
        console.log('login', action.payload.user)
            return {
                ...state,
                profile: action.payload.user,
                formSubmitted: false
            }
        case Types.ADD_USER:
            return {
                ...state,
                profile: action.payload.user,
                formSubmitted: false
            }
        case Types.UPDATE_USER:
            return {
                ...state,
                profile: action.payload.user,
                formSubmitted: false
            }
        case Types.FORM_SUBMITION_STATUS:
            return {
                ...state,
                formSubmitted: action.payload.status
            }
        default:
            return state;
    }
}

export default reducer