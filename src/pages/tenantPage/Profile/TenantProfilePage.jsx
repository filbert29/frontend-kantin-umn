import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogout } from "../../../store/Auth";
import { Logout } from "@mui/icons-material";

const TenantProfilePage = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(setLogout())
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ textAlign: "center" }}>Profile Page</Typography>
            <Button onClick={handleLogout} variant="contained" endIcon={<Logout />}>
                Logout
            </Button>
        </Box>
    );
}

export default TenantProfilePage;