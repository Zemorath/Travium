import { configureStore } from "@reduxjs/toolkit"
import userReducer from './UserSlice'
import providersReducer from './ProviderSlice'
import servicesReducer from './ServicesSlice'
import userSubscriptionsSlice from './userSubscriptionSlice'


const store = configureStore({
    reducer:{
        user: userReducer,
        providers: providersReducer,
        services: servicesReducer,
        userSubscriptions: userSubscriptionsSlice,
    }
});



export default store;