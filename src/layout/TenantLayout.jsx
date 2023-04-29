import { Fastfood, Home, Person, Receipt } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const TenantLayout = () => {
    return (
        <Box
            sx={{
                position: "sticky",
                bottom: 0,
            }}
        >
            <Box sx={{ minHeight: "87vh" }} >
                <Outlet />
            </Box>
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
            />
            <BottomNavigationAction
                label="Menu"
                value="menu"
                icon={<Fastfood />}
                LinkComponent={Link}
                to="/tenant/menu"
            />
            <BottomNavigationAction
                label="Order"
                value="order"
                icon={<Receipt />}
                LinkComponent={Link}
                to="/tenant/order"
            />
            <BottomNavigationAction
                label="Profile"
                value="profile"
                icon={<Person />}
                LinkComponent={Link}
                to="/tenant/profile"
            />
        </BottomNavigation>
    )
}
