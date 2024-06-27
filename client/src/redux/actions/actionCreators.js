import { Types } from './actionTypes'

export const ActionCreators = {

    addProfile: (user) => ({ type: Types.ADD_USER, payload: { user }}),

    updateProfile: (user) => ({ type: Types.UPDATE_USER, payload: { user }}),

    formSubmitionStatus: (status) => ({ type: Types.FORM_SUBMITION_STATUS, payload: {status }}),

    login: (user) => ({ type: Types.LOGIN, payload: { user }})
}