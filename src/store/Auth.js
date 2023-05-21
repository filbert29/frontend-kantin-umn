import { createSlice } from "@reduxjs/toolkit"
import localstorage from "../helper/localstorage"

const initialState = {
    isLoggedin: localstorage.getFromLocalStorage("auth") ? true : false,
    accountData: localstorage.getFromLocalStorage("auth") || null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, { payload }) => {
            state.isLoggedin = true
            state.accountData = payload
            localstorage.setToLocalStorage("auth", payload)
        },
        setLogout: (state) => {
            state.isLoggedin = false
            state.accountData = null
            localstorage.removeFromLocalStorage("auth")
            window.location.reload()
        },
    },
})

export const { setLogin, setLogout } = authSlice.actions

export default authSlice.reducer