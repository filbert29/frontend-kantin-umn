import { BottomNavigation, BottomNavigationAction, Box, Paper } from "@mui/material";
import { useState } from "react";
import HomeNavbar from "../assets/home-navbar.png"
import { Link } from "react-router-dom";

const NavBar = () => {
    const [value, setValue] = useState(0);

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: "10" }} elevation={5}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{
                    backgroundColor: "#2F64F9",

                }}
            >
                <BottomNavigationAction children sx={{ color: "white" }} label="Home"><Link to={"/"}></Link></BottomNavigationAction>
                <BottomNavigationAction sx={{ color: "white" }} label="Search" />
                <BottomNavigationAction sx={{ color: "white" }} label="History" />
                <BottomNavigationAction sx={{ color: "white" }} label="Cart" />
                <BottomNavigationAction sx={{ color: "white" }} label="Profile" />
            </BottomNavigation>
        </Paper>
    );
}

export default NavBar;