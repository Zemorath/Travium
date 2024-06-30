import { configureStore } from "@reduxjs/toolkit"
import userReducer from './UserSlice'
import providersReducer from './ProviderSlice'
import servicesReducer from './ServicesSlice'


const store = configureStore({
    reducer:{
        user: userReducer,
        providers: providersReducer,
        services: servicesReducer,
    }
});



export default store;