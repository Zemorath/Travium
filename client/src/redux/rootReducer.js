import { combineReducers } from 'redux'
import userReducer from './user/userReducer'
import empReducer from './employees/empReducer'

const rootReducer = combineReducers({
    user: userReducer,
    emp: empReducer
})

export default rootReducer