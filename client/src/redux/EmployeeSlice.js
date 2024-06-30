import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employee: null,
        error: null,
        isLoggedIn: false,
    },
    reducers: {
        setEmployee: (state, action) => {
            state.employee = action.payload;
            state.error = null;
            state.isLoggedIn = true
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearEmployee: (state) => {
            state.employee = null;
            state.isLoggedIn = false
        }
    },
});

export const { setEmployee, setError, clearEmployee } = employeeSlice.actions;

export const loginEmployee = (credentials) => async (dispatch) => {
    try {
        const response = await fetch ('/employeelogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (response.ok) {
            const employee = await response.json();
            dispatch(setEmployee(employee));
        } else {
            dispatch(setError('Invalid username or password'));
        }
    } catch (error) {
        dispatch(setError('An error occurred while logging in'));
    }
};

export const signupEmployee = (employeeData) => async (dispatch) => {
    try {
        const response = await fetch('/employeesignup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeData),
        });

        if (response.ok) {
            const employee = await response.json();
            dispatch(setEmployee(employee));
        } else {
            dispatch(setError('Username or email is already in use'));
        }
    } catch (error) {
        dispatch(setError('An error occurred while signing up'));
    }
};

export const updateEmployee = (updatedEmployeeData) => async (dispatch) => {
    try {
        const response = await fetch('/employeeinfo', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEmployeeData)
        });

        if (response.ok) {
            const employee = await response.json();
            dispatch(setEmployee(employee));
        } else {
            const error = await response.json();
            dispatch(setError(error.message));
        }
    } catch (error) {
        dispatch(setError('An error occurred while updating employee information'));
    }
};

export const deleteEmployee = () => async (dispatch) => {
    try {
        const response = await fetch('/employeeinfo', {
            method: 'DELETE',
        });

        if (response.ok) {
            dispatch(clearEmployee());
        } else {
            const error = await response.json();
            dispatch(setError(error.message));
        }
    } catch (error) {
        dispatch(setError('An error occurred while deleting employee account'));
    }
};

export const selectEmployeeState = (state) => state.employee;
export default employeeSlice.reducer;

