import { Comment, Fastfood, Home, Person, Receipt } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { mutate } from "swr";
import BASE_URL from "../config/BASE_URL";
import { addNotification } from "../store/Notification";

const theme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    maxWidth: "900px !important",
                }
            }
        }
    }
})

const socket = io("http://localhost:3005", { transports: ["websocket"], autoConnect: false })

const TenantLayout = () => {
    const accountData = useSelector((state) => state.auth.accountData)
    const dispatch = useDispatch()

    const connectWebsocket = () => {
        socket.connect()
        socket.emit("tenant:join", accountData?._id)
    }

    const socketListener = () => {
        socket.on(`tenant/update/${accountData?._id}`, (data) => {
            const refetchUrl = `${BASE_URL}${data.url}`
            mutate(refetchUrl)
            dispatch(addNotification({
                message: data?.message,
                type: "info"
            }))
        })
    }

    useEffect(() => {
        connectWebsocket()
        socketListener()
        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <Box
            sx={{
                position: "sticky",
                bottom: 0,
            }}
        >
            <ThemeProvider theme={theme}>
                <Box sx={{ minHeight: "87vh", mt: 2, mb: 4 }} >
                    <Outlet />
                </Box>
            </ThemeProvider>
            <TenantNavBar />
        </Box>
    );
}

export default TenantLayout;

const TenantNavBar = () => {
    const location = useLocation()
    const [value, setValue] = useState("")

    useEffect(() => {
        let path = location.pathname.split("/")[2]

        if (path === undefined) {
            setValue("home")
        } else {
            setValue(path)
        }
    }, [location.pathname])

    return (
        <BottomNavigation
            showLabels
            sx={{
                boxShadow: "0px -5px 10px rgba(0, 0, 0, 0.25)",
                position: "sticky",
                bottom: 0,
            }}
            value={value}
        >
            <BottomNavigationAction
                label="Home"
                value="home"
                icon={<Home />}
                LinkComponent={Link}
                to="/tenant"
                sx={{ p: 0, minWidth: { xs: 70, sm: 80 } }}
            />
            <BottomNavigationAction
                label="Menu"
                value="menu"
                icon={<Fastfood />}
                LinkComponent={Link}
                to="/tenant/menu"
                sx={{ p: 0, minWidth: { xs: 70, sm: 80 } }}
            />
            <BottomNavigationAction
                label="Order"
                value="order"
                icon={<Receipt />}
                LinkComponent={Link}
                to="/tenant/order"
                sx={{ p: 0, minWidth: { xs: 70, sm: 80 } }}
            />
            <BottomNavigationAction
                label="Review"
                value="review"
                icon={<Comment />}
                LinkComponent={Link}
                to="/tenant/review"
                sx={{ p: 0, minWidth: { xs: 70, sm: 80 } }}
            />
            <BottomNavigationAction
                label="Profile"
                value="profile"
                icon={<Person />}
                LinkComponent={Link}
                to="/tenant/profile"
                sx={{ p: 0, minWidth: { xs: 70, sm: 80 } }}
            />
        </BottomNavigation>
    )
}