// counterSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
};

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        clearUser: (state) => {
            return null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user;

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

export { userSlice, counterSlice };  // Export both slices
export default counterSlice.reducer;  // Export the default reducer
