import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    loginEmployee(state) {
      state.isLoggedIn = true;
    },
    logoutEmployee(state) {
      state.isLoggedIn = false;
      // Reset any other state related to employees on logout if needed
    },
  },
});

export const { loginEmployee, logoutEmployee } = employeesSlice.actions;

export const selectEmployeeState = (state) => state.employees;

export default employeesSlice.reducer;