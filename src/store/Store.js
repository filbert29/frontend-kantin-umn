import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../store/Auth'
import { notificationSlice } from '../store/Notification'
import { tenantSlice } from '../store/Tenant'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        notification: notificationSlice.reducer,
        tenant: tenantSlice.reducer,
    },
})