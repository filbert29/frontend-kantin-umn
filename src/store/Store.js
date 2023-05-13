import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../store/Auth'
import { notificationSlice } from '../store/Notification'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        notification: notificationSlice.reducer,
    },
})