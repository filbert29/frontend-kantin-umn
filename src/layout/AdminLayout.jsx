import { AppBar, Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar, Typography } from "@mui/material";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import MenuIcon from './../assets/icon/menu-icon.svg';
import { AdminMenu } from "../config/menu.config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "../store/Auth";
import { AddBox, Dashboard, Fastfood, People, Receipt, Store } from '@mui/icons-material';

const AdminLayout = () => {
    const location = useLocation();
    const params = useParams()
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const dispatch = useDispatch()

    const pathName = params?.id ? location.pathname.replace(params?.id, ":id") : location.pathname 


    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    const logout = () => {
        dispatch(setLogout())
    }

    return (
        <>
            <Box sx={{ display: "flex", background: "rgba(0,0,0,0.05)" }} >
                <Box sx={{
                    width: sidebarOpen ? "300px" : 0,
                    transition: "0.4s",
                    backgroundColor: "#10172A",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    minHeight: "100vh",
                }}>
                    <Box sx={{
                        padding: "20px 0 30px 0",
                        color: "white"
                    }} >
                        <Box>
                            <Typography
                                mt=""
                                variant="h4"
                                component="h1"
                                fontSize="26px"
                                padding="0 30px"
                            >
                                Kantin UMN
                            </Typography>
                            <Typography
                                variant="h4"
                                component="h1"
                                fontSize="20px"
                                padding="0 30px"
                            >
                                Admin
                            </Typography>
                        </Box>
                        <Divider sx={{ backgroundColor: "white", margin: "18px 0 0 0" }} />
                        <Box>
                            <List sx={{ py: 0 }}>
                                <ListMenu title={"Dashboard"} path={"/admin"} icon={<Dashboard />} />
                                <ListMenu title={"Register Tenant"} path={"/admin/register-tenant"} icon={<AddBox />} />
                                <ListMenu title={"Tenant"} path={"/admin/tenant"} icon={<Store />} />
                                <ListMenu title={"Customer"} path={"/admin/customer"} icon={<People />} />
                                <ListMenu title={"Order"} path={"/admin/order"} icon={<Receipt />} />
                                <ListMenu title={"Menu"} path={"/admin/menu"} icon={<Fastfood />} />
                            </List>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Box sx={{
                        padding: "30px",
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
                                    {AdminMenu[pathName]}
                                </Typography>
                                <Button onClick={logout} color="inherit">
                                    Logout
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <Box component={Paper} elevation={5}  p={"25px"} mt={"30px"}>
                            <Outlet />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default AdminLayout;

const ListMenu = ({ title, path, icon }) => {
    const isActive = useLocation().pathname === path

    return (
        <ListItem disablePadding sx={{ color: "white" }} component={NavLink} to={path}>
            <ListItemButton sx={{ pl: "30px", "&:hover": { background: "#1a233d" }, background: isActive ? "#273764" : "transparent" }}>
                <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                    {icon}
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: "18px" }} primary={title} />
            </ListItemButton>
        </ListItem>
    )
}