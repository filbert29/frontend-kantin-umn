import { BottomNavigation, BottomNavigationAction, Box, Paper } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/style/styleNavbar.css"

const NavBar = () => {
    const [value, setValue] = useState(0);

    const goHome = useNavigate()

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: "10" }} >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{
                    backgroundColor: "#2F64F9",
                    height: "70px"

                }}
            >
                <BottomNavigationAction sx={{ color: "white" }} icon={
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="40" height="40"
                        viewBox="0 0 24 24">
                        <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"></path>
                    </svg>
                } label="Home"
                    component={Link}
                    to={"/"} />
                <BottomNavigationAction component={Link} to={"/search/searchpage"} sx={{ color: "white" }} label="Search" />
                <BottomNavigationAction component={Link} to={"/transaction/history"} sx={{ color: "white" }} label="History" />
                <BottomNavigationAction component={Link} to={"/cart/listcart"} sx={{ color: "white" }} label="Cart" />
                <BottomNavigationAction component={Link} to={"/profile/myaccount"} sx={{ color: "white" }} label="Profile" />
            </BottomNavigation>
        </Paper>
    );
}

export default NavBar;