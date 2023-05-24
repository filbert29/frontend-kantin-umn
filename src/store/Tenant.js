import { createSlice } from "@reduxjs/toolkit"
import localstorage from "../helper/localstorage"

const initialState = {
    orderPriority: localstorage.getFromLocalStorage("orderPriority") || "fcfs"
}

export const tenantSlice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {
        setPriority: (state, { payload }) => {
            state.orderPriority = payload
            localstorage.setToLocalStorage("orderPriority", payload)
        }
    },
})

export const { setPriority } = tenantSlice.actions

export default tenantSlice.reducer