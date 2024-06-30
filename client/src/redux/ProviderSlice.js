import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProviders = createAsyncThunk('providers/fetchProviders', async () => {
    const response = await fetch('/providers');
    if (response.ok) {
        const providers = await response.json();
        return providers;
    }
    throw new Error('Failed to fetch providers');
});

const providersSlice = createSlice({
    name: 'providers',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchProviders.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchProviders.fulfilled]: (state, action) => {
            state.loading = false;
            state.list = action.payload;
        },
        [fetchProviders.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
    },
});

export const selectProviders = (state) => state.providers.list;

export default providersSlice.reducer;