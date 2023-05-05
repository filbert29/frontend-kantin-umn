import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notification: []
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, { payload }) => {
            payload.id = Date.now()
            state.notification.push(payload)
        },
        removeNotification: (state, { payload }) => {
            state.notification = state.notification.filter((notification) => notification.id !== payload)
        }
    },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer