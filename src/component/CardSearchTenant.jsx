import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material"
import Star from "../assets/yellow-star.png"
import NoImage from "../assets/No_Image_Available.jpg"

const CardSearchTenant = ({ data }) => {
    return (
        <Box display={"grid"} justifyContent={"center"}>
            <Box
                component={Link}
                to={`/customer/tenant/detailtenant/${data._id}`}
                className="shadow-box"
                sx={{
                    padding: { sm: "25px 30px", xs: "15px 20px" },
                    borderRadius: "10px",
                    width: { md: "600px", sm: "450px", xs: "280px" },
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "#5F6C7B"
                }}>
                <img src={data?.profile_image || NoImage} alt="" width={"134px"} style={{ borderRadius: "15px", minHeight: "129px" }} />
                <Box className="deskripsi" ml={"25px"} display={"grid"} gap={"2px"}>
                    <Typography variant="p"
                        sx={{
                            fontSize: { sm: "20px", xs: "16px" },
                            fontWeight: "bold"
                        }}
                    >{data?.full_name}</Typography>
                    <Typography variant="p"
                        sx={{
                            fontSize: { sm: "14px", xs: "10px" }
                        }}
                    >{data?.description}</Typography>
                    <Box display={"flex"} alignItems={"center"} gap={"5px"}>
                        <img src={Star} alt="" width={"25px"} />
                        <Typography variant="p" fontSize={"14px"}>4.7 (12)</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CardSearchTenant;
