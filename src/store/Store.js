import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../store/Auth'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
})