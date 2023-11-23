// store.js

import { configureStore } from '@reduxjs/toolkit';
import { userSlice, counterSlice } from '../features/counter/counterSlice';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,  // Use userSlice.reducer
        counter: counterSlice.reducer,
    },
});



