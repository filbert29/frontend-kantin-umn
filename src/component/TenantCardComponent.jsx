import { Box, Typography } from "@mui/material";
import PicTenant from "../assets/pic-tenant.png"
import Star from "../assets/star.png"
import { Link } from "react-router-dom";

const TenantCardComponent = () => {
    return (
        <Box
            component={Link}
            to={"/customer/tenant/detailtenant"}
            className="card-tenant"
            sx={{
                display: "grid",
                width: "23%",
                boxShadow: "0px 0px 4px 2px rgba(0,0,0,0.1)",
                borderRadius: "15px",
                textDecoration: "none",
                color: "#5F6C7B"
            }}>
            <img src={PicTenant} alt="" width={"100%"} />
            <Box sx={{
                display: "grid",
                padding: "10px 15px",
                gap: "1px"
            }}>
                <Typography variant="p" fontSize={"16px"} fontWeight={"bold"}>Kedai Nasi Goreng</Typography>
                <Typography variant="p" fontSize={"14px"}>Aneka Nasi Goreng</Typography>
                <Box display={"flex"} alignItems={"center"} gap={"3px"}>
                    <img src={Star} alt="" width={"20px"} />
                    <Typography variant="p" fontSize={"14px"}>4.7 (12)</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default TenantCardComponent;