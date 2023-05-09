import { Box, Typography } from "@mui/material";
import BackButton from "../assets/back-btn.png"
import { useNavigate } from "react-router-dom"


const Header = ({ title }) => {
    const backbtn = useNavigate()

    return (
        <Box
            mb={"30px"}
            className="header"
            pl={"10px"}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px"
            }}>
            <Box
                component={"button"}
                onClick={() => backbtn(-1)}
                className="back-navigate"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "white",
                    border: "none",
                    cursor: "pointer"
                }}>
                <img src={BackButton} alt="" />
            </Box>
            <Box className="page-title">
                <Typography variant="p" sx={{
                    fontSize: {sm: "28px", xs: "24px"},
                    fontWeight: "bold"
                }}>{title}</Typography>
            </Box>
        </Box>
    );
}

export default Header;