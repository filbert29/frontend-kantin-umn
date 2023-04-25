import { Box, Divider, Typography } from "@mui/material";

const DashboardPage = () => {
    return (
        <Box textAlign={"center"} py={10}>
            <Typography variant="h4" component="h1" fontWeight={"bold"}>
                Hello Admin!
            </Typography>

            
            <Divider sx={{ my: 2 }} />

            <Typography variant="h5" component="p">
                Welcome to the admin dashboard. This is where you can manage kantin UMN data
            </Typography>
        </Box>
    );
}

export default DashboardPage;