import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
    const response = await fetch('/availableservices');
    if (response.ok) {
        const services = await response.json();
        return services;
    }
    throw new Error('Failed to fetch services');
});

const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchServices.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchServices.fulfilled]: (state, action) => {
            state.loading = false;
            state.list = action.payload;
        },
        [fetchServices.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
    },
});

export const selectServices = (state) => state.services.list;

export default servicesSlice.reducer;