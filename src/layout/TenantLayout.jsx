import { Comment, Fastfood, Home, Person, Receipt } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

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

const TenantLayout = () => {
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