import { Box } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <Box>
            <NavBar />
            <Outlet />
        </Box>
    );
}

export default Layout;