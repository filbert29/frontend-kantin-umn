import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import PicTenant from "../assets/pic-tenant.png"
import Star from "../assets/star.png"
import { Link } from "react-router-dom";
import NoImage from "../assets/No_Image_Available.jpg"

const TenantCardComponent = ({ tenant }) => {
    return (
        <Box
            component={Link}
            to={`/customer/tenant/detailtenant/${tenant._id}`}
            className="card-tenant"
            sx={{
                // display: "grid",
                // width: "23%",
                boxShadow: "0px 0px 4px 2px rgba(0,0,0,0.1)",
                borderRadius: "15px",
                textDecoration: "none",
                color: "#5F6C7B"
            }}>
            {/* <img src={tenant?.profile_image || NoImage} alt="no image" width={"100%"} style={{ borderRadius: "15px", minHeight: "186px" }} />
            <Box sx={{
                display: "grid",
                padding: "10px 15px",
                gap: "1px"
            }}>
                <Typography variant="p" fontSize={"16px"} sx={{ width: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} fontWeight={"bold"}>{tenant?.full_name}</Typography>
                <Typography variant="p" fontSize={"14px"} sx={{ width: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tenant?.description}</Typography>
                <Box display={"flex"} alignItems={"center"} gap={"3px"}>
                    <img src={Star} alt="" width={"20px"} />
                    <Typography variant="p" fontSize={"14px"}>4.7 (12)</Typography>
                </Box>
            </Box> */}
            <Card sx={{ maxWidth: 345, borderRadius: "15px", boxShadow: "0px 0px 4px 2px rgba(0,0,0,0.1)", }}>
                <CardMedia
                    className="tenant-img"
                    component="img"
                    height="194"
                    image={tenant?.profile_image}
                    alt="Paella dish"
                />
                <CardContent>
                    <Box sx={{
                        display: "grid",
                        // padding: "10px 15px",
                        gap: "1px"
                    }}>
                        <Typography variant="p"
                            sx={{
                                fontSize: { md: "16px", xs: "14px" },
                                fontWeight: "bold",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                textAlign: "left"
                            }}
                        >{tenant?.full_name}</Typography>
                        <Typography variant="p"
                            sx={{
                                fontSize: {md: "14px", xs: "12px"},
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >{tenant?.description}</Typography>
                        <Box display={"flex"} alignItems={"center"} gap={"3px"}>
                            <img className="star" src={Star} alt="" />
                            <Typography variant="p" fontSize={"14px"}>4.7 (12)</Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box >
    );
}

export default TenantCardComponent;