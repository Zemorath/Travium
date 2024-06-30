import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchUserSubscriptions = createAsyncThunk(
  'userSubscriptions/fetchUserSubscriptions',
  async () => {
    const response = await fetch('/subscriptionsusing');
    if (response.ok) {
      const subscriptions = await response.json();
      return subscriptions;
    }
    throw new Error('Failed to fetch user subscriptions');
  }
);

const userSubscriptionsSlice = createSlice({
  name: 'userSubscriptions',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchUserSubscriptions.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchUserSubscriptions.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    [fetchUserSubscriptions.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const selectUserSubscriptions = (state) => state.userSubscriptions.list;

export default userSubscriptionsSlice.reducer;