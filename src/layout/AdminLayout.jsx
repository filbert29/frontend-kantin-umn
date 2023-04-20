import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import MenuIcon from './../assets/icon/menu-icon.svg';
import { AdminMenu } from "../config/menu.config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "../store/Auth";

const AdminLayout = () => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const dispatch = useDispatch()

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    const logout = () => {
        dispatch(setLogout())
    }

    return (
        <>
            <Box sx={{ display: "flex" }} >
                <Box sx={{
                    width: sidebarOpen ? "300px" : 0,
                    transition: "0.4s",
                    backgroundColor: "#10172A",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    minHeight: "100vh",
                }}>
                    <Box sx={{
                        padding: "30px",
                        color: "white"
                    }} >
                        <Typography
                            mt="10px"
                            variant="h4"
                            component="h1"
                            fontSize="32px"
                        >
                            Kantin UMN
                        </Typography>
                        <Typography
                            variant="h4"
                            component="h1"
                            fontSize="20px"
                        >
                            Admin
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Box sx={{
                        padding: "2em",
                    }}>
                        <AppBar position="static" sx={{ background: "#fff", color: "black" }}>
                            <Toolbar>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                    onClick={toggleSidebar}
                                >
                                    <img alt="" width={"20px"} src={MenuIcon} />
                                </IconButton>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    {AdminMenu[location.pathname]}
                                </Typography>
                                <Button onClick={logout} color="inherit">
                                    Logout
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default AdminLayout;